import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import pandas as pd
from collections import defaultdict

def get_selectors(soup):
    selectors = set()
    for tag in soup.find_all(True):  # True finds all tags
        if 'id' in tag.attrs:
            selectors.add(f"#{tag.attrs['id']}")
        if 'class' in tag.attrs:
            for class_name in tag.attrs['class']:
                selectors.add(f".{class_name}")
    return selectors

def crawl(url, base_url, visited, tree, links_data, selectors, max_depth=2, current_depth=0):
    if current_depth > max_depth:
        return links_data
    
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Collect selectors on the current page
        page_selectors = get_selectors(soup)
        selectors.update(page_selectors)
        print(f"Selectors found on {url}: {page_selectors}")

        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            full_url = urljoin(base_url, href)
            if urlparse(full_url).netloc == urlparse(base_url).netloc:
                links.append(full_url)

        for link in links:
            if link not in visited:
                visited.add(link)
                tree[url].append(link)
                links_data.append({
                    'Parent URL': url,
                    'Page Name': soup.title.string if soup.title else 'N/A',
                    'URL': link
                })
                crawl(link, base_url, visited, tree, links_data, selectors, max_depth, current_depth + 1)

    except Exception as e:
        print(f"Error crawling {url}: {e}")
        
    return links_data



if __name__ == "__main__":
    start_url = 'https://mechlintech.com/'
    visited_links = set()
    visited_links.add(start_url)
    links_data = []
    tree = defaultdict(list)
    all_selectors = set()
    
    
    start_time = time.time()
    crawl(start_url, start_url, visited_links, tree, links_data, all_selectors)
    end_time = time.time()
    
    df = pd.DataFrame(links_data)
    df.insert(0, 'S.No.', range(1, len(df) + 1))

    # Save the DataFrame to a CSV file
    # df.to_csv('crawled_links.csv', index=False, header=True)
    hmtl_table = df.to_html(index=False)
    
    with open('crawled_links.html', 'w') as file:
        file.write(hmtl_table)
    
    print(f"Crawled {len(visited_links)} pages in {end_time - start_time} seconds")
    # for link in visited_links:
    #     print(link)
    
    for parent, children in tree.items():
        print(f"Parent URL: {parent}")
        for child in children:
            print(f"Child URL: {child}")
    
    for selector in sorted(all_selectors):
        print(selector)
    
