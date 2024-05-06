from docker import DockerClient

def start_hello_world_container():
    client = DockerClient()

    # Pull the Docker image (if not already pulled)
    client.images.pull('hello-world')

    # Run the Docker container
    container = client.containers.run('hello-world', detach=True)

    # Print the container ID
    print(f"Container ID: {container.id}")

if __name__ == "__main__":
    start_hello_world_container()