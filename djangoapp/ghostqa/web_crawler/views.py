
from rest_framework import viewsets, status,serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
from selenium import webdriver
from bs4 import BeautifulSoup
from .models import CrawlRequest, Node
from .serializers import CrawlRequestSerializers

from urllib.parse import urlparse, parse_qsl, urlunparse, urlencode
def get_full_xpath(tag):
    # Initialize the XPath string
    xpath = ''

    # Construct the XPath by traversing the ancestors of the tag
    for parent in tag.parents:
        if parent.name:
            # Get the tag name
            tag_name = parent.name

            # Get the index of the tag among its siblings
            index = sum(1 for sibling in parent.previous_siblings if sibling.name == tag_name) + 1

            # Append the tag name with index to the XPath
            xpath = f'/{tag_name}[{index}]/{xpath}'

    # Append the tag name of the current tag to the XPath
    xpath = f'/{tag.name}[1]/{xpath}'

    return xpath
def normalize_url(url):
    # Parse the URL
    parsed_url = urlparse(url)
    
    # Convert the netloc and path to lowercase
    netloc = parsed_url.netloc.lower()
    path = parsed_url.path.rstrip('/')
    
    # Sort and encode query parameters
    query = urlencode(sorted(parse_qsl(parsed_url.query)))
    
    # Rebuild the URL
    normalized_url = urlunparse(
        (parsed_url.scheme, netloc, path, parsed_url.params, query, parsed_url.fragment)
    )
    
    return normalized_url
def normalize_site(url):
    # Parse the URL
    parsed_url = urlparse(url)
    
    # Extract scheme and netloc (hostname and port)
    scheme = parsed_url.scheme.lower()
    netloc = parsed_url.netloc.lower()
    
    return f"{scheme}://{netloc}"

def is_same_site(url1, url2):
    return normalize_site(url1) == normalize_site(url2)
class CrawlViewSet(viewsets.ModelViewSet):
    queryset = CrawlRequest.objects.all()
    serializer_class = CrawlRequestSerializers
    
    @action(detail=True, methods=['get'])
    def get_all_possible_paths(self,request,*args, **kwargs):
        object = self.get_object()
        leaf_nodes = object.list_leaf_nodes()
        paths = []
        for node in leaf_nodes:
            backtrace_path = node.backtrace_path()
            paths.append(' ---> '.join([node.url for node in backtrace_path]))
        
        return Response({'paths': paths}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'])
    def get_all_possible_workflows(self,request,*args, **kwargs):
        object = self.get_object()
        leaf_nodes = object.list_leaf_nodes()
        paths = []
        
        index = 0
        testSuites =[]
        for node in leaf_nodes:
            backtrace_path = node.backtrace_path()
            index = index +1
            testSuite= {
                "name": f"crawl request: {object.id}",
                'beforeEach': [],
                'testCases':[]
            }
            test_case = {
                'name' : f"Workflow Name: {index}",
                'actions':[]
            }
            for node in backtrace_path:
                if node.is_start_node:
                    testSuite['beforeEach'] = [{'type':'visit',"selector":node.url}]
                else:
                    test_case['actions'].append({
                        "type":node.action,
                        "selector":node.selector,
                        # "description": f"When you {node.action} on {node.element_info}  from the page {node.previous_node.url} it should open {node.url}"
                    })
            
            testSuite['testCases'].append(test_case)
            testSuites.append(testSuite)
            if index > 3:
                break
                
        return Response({'testSuite': testSuites}, status=status.HTTP_200_OK)        
    @action(detail=False, methods=['post'])
    def crawl_website(self, request):
        start_url = request.data.get('start_url')
        client_reference_id = request.data.get('client_reference_id')
        max_depth = request.data.get('max_depth', 10)

        # Start Selenium WebDriver
        options = webdriver.ChromeOptions()
        # options.add_argument('headless')
        driver = webdriver.Chrome(options=options)

        crawl_request = CrawlRequest.objects.create(
            start_url=start_url,
            client_reference_id=client_reference_id,
            max_depth=max_depth
        )
        visited_urls = set()
        def get_selector(tag):
            if tag.has_attr('id'):
                return f'#{tag["id"]}'
            elif tag.has_attr('name'):
                return f'name={tag["name"]}'
            elif tag.has_attr('class'):
                return f'.{".".join(tag["class"])}'
            else:
                xpath = get_full_xpath(tag)
                return xpath
        
        def crawl(url, depth, previous_node=None,selector=None,element=None):
            if depth > max_depth or normalize_url(url) in visited_urls:
                return
            normalized_current_url = normalize_url(url)
            visited_urls.add(normalized_current_url)  # Mark the current URL as visited
            driver.get(url)
            html_content = driver.page_source
            soup = BeautifulSoup(html_content, 'html.parser')

           
            if  normalize_url(url) == normalize_url(start_url) and depth > 0:
                return
            
            if not is_same_site(url,start_url):
                return
            
            visited = Node.objects.filter(crawl_request=crawl_request,url=url,client_reference_id=client_reference_id).exists()
            node = Node.objects.create(
                        url=url,
                        action='click',
                        selector=selector,
                        is_start_node=(depth == 0 and normalize_url(url) == normalize_url(start_url) ),
                        crawl_request=crawl_request,
                        previous_node=previous_node,
                        client_reference_id=client_reference_id,
                        element_info={"html": str(element)},
                        depth=depth,
                        visited=visited
                    )
            anchor_tags = soup.find_all('a')
            for tag in anchor_tags:
                href = tag.get('href')
                if href and href.startswith('http') and is_same_site(href,start_url):
                    print(href,visited)
                    selector = get_selector(tag)
                    
                   
                    if not visited:
                        crawl(href, depth + 1, node,selector,tag)

        crawl(start_url, 0)

        driver.quit()

        return Response({'message': 'Crawl completed successfully'}, status=status.HTTP_200_OK)
