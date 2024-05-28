import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import pandas as pd
from collections import defaultdict
from graphviz import Digraph
from graphviz import Digraph


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
                crawl(link, base_url, visited, tree, links_data, max_depth, current_depth + 1)

    except Exception as e:
        print(f"Error crawling {url}: {e}")
        
    return links_data

def draw_tree(tree):
    dot = Digraph(comment='Website Tree')
    for parent, children in tree.items():
        for child in children:
            dot.edge(parent, child)
    dot.render('website_tree', format='png', cleanup=True)

if __name__ == "__main__":
    start_url = 'https://mechlintech.com/'
    visited_links = set()
    visited_links.add(start_url)
    links_data = []
    tree = defaultdict(list)
    
    
    start_time = time.time()
    crawl(start_url, start_url, visited_links, tree, links_data)
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
    
    draw_tree(tree)
    
