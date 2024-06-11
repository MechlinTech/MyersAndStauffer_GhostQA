import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import pandas as pd
from collections import defaultdict
import time

def get_anchor_selector(anchor):
    selector = ""
    if 'id' in anchor.attrs:
        selector += f"#{anchor.attrs['id']}"
    if 'class' in anchor.attrs:
        for class_name in anchor.attrs['class']:
            selector += f".{class_name}"
    return selector

def crawl(url, base_url, visited, tree, links_data, max_depth=2, current_depth=0):
    if current_depth > max_depth:
        return links_data
    
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            full_url = urljoin(base_url, href)
            if urlparse(full_url).netloc == urlparse(base_url).netloc:
                selector = get_anchor_selector(link)
                links.append((full_url, selector))

        for full_url, selector in links:
            if full_url not in visited:
                visited.add(full_url)
                tree[url].append(full_url)
                links_data.append({
                    'Parent URL': url,
                    'Page Name': soup.title.string if soup.title else 'N/A',
                    'URL': full_url,
                    'Selector': selector
                })
                crawl(full_url, base_url, visited, tree, links_data, max_depth, current_depth + 1)

    except Exception as e:
        print(f"Error crawling {url}: {e}")
        
    return links_data

if __name__ == "__main__":
    start_url = 'https://mechlintech.com/'  # Replace with your target URL
    visited_links = set()
    visited_links.add(start_url)
    links_data = []
    tree = defaultdict(list)
    
    start_time = time.time()
    crawl(start_url, start_url, visited_links, tree, links_data)
    end_time = time.time()
    
    # Create DataFrame
    df = pd.DataFrame(links_data)
    df.insert(0, 'S.No.', range(1, len(df) + 1))

    # Save the DataFrame to an HTML file
    html_table = df.to_html(index=False)
    
    with open('crawled_links.html', 'w') as file:
        file.write(html_table)
    
    print(f"Crawled {len(visited_links)} pages in {end_time - start_time} seconds")
    
    # Print Parent-Child URL relationship
    for parent, children in tree.items():
        print(f"Parent URL: {parent}")
        for child in children:
            print(f"Child URL: {child}")
    
    # Print all selectors
    all_selectors = set()
    for data in links_data:
        all_selectors.add(data['Selector'])
    
    for selector in sorted(all_selectors):
        print(selector)
