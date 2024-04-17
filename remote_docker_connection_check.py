import docker

# Specify the remote Docker host
docker_host = 'tcp://15.207.97.170:2375'

# Create a Docker client object to connect to the remote Docker host
client = docker.DockerClient(base_url=docker_host)
print(client)

# List the containers running on the remote Docker host
containers = client.containers.list()

# Print the container IDs and names
for container in containers:
    print(f"Container ID: {container.id}, Name: {container.name}")
