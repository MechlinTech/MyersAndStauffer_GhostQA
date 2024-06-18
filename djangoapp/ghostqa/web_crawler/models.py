from django.db import models
from collections import defaultdict

class CrawlRequest(models.Model):
    start_url = models.URLField()
    max_depth = models.IntegerField(default=10)  # Assuming a max depth attribute based on the discussion
    client_reference_id = models.CharField(max_length=255)  # Adding client reference ID

    def __str__(self):
        return f"{self.start_url} (Client Ref: {self.client_reference_id})"

    def list_leaf_nodes(self):
        leaf_nodes = []
        start_nodes = self.nodes.filter(is_start_node=True)

        def dfs(node):
            if not node.next_nodes.exists():
                leaf_nodes.append(node)
            else:
                for next_node in node.next_nodes.all():
                    dfs(next_node)

        for start_node in start_nodes:
            dfs(start_node)
        
        return leaf_nodes
    def list_all_paths(self):
        leaf_nodes = []
        start_nodes = self.nodes.filter(is_start_node=True)

        def dfs(node):
            if not node.next_nodes.exists():
                leaf_nodes.append(node)
            else:
                for next_node in node.next_nodes.all():
                    dfs(next_node)

        for start_node in start_nodes:
            dfs(start_node)
        
        return [node.url for node in leaf_nodes]
        
        
        # # Get all nodes associated with this CrawlRequest
        # nodes = self.nodes.filter(is_start_node=False)
        # if nodes.exists():
        #     # Group nodes by depth
        #     nodes_by_depth = defaultdict(list)
        #     for node in nodes:
        #         nodes_by_depth[node.depth].append(node)

        #     # Get the maximum depth
        #     max_depth = max(nodes_by_depth.keys())

        #     # Initialize a list to store all paths
        #     all_paths = []

        #     # Iterate through each leaf node (nodes with the highest depth)
        #     for node in nodes_by_depth[max_depth]:
        #         # Backtrace the path from the leaf node to the start node
        #         path = node.backtrace_path()

        #         # Append the path to the list of all paths
        #         all_paths.append('->'.join(node.url for node in path))

        #     return  all_paths
        # return []

class Node(models.Model):
    url = models.URLField()
    action = models.CharField(max_length=255,null=True)
    selector = models.CharField(max_length=255,null=True)
    is_start_node = models.BooleanField(default=False)
    crawl_request = models.ForeignKey(CrawlRequest, on_delete=models.CASCADE, related_name='nodes')
    previous_node = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='next_nodes')
    client_reference_id = models.CharField(max_length=255)  # Adding client reference ID
    element_info = models.JSONField(null=True, blank=True)  # Adding column to store rich information about the HTML element
    depth = models.IntegerField(null=True, blank=True)   # Adding depth field
    visited = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.url} ({'start' if self.is_start_node else 'node'}) - Client Ref: {self.client_reference_id}"

    def backtrace_path(self):
        node = self
        path = []
        while node:
            path.append(node)
            node = node.previous_node
        return path[::-1]
