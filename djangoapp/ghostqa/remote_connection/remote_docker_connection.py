import docker
import paramiko

'''Docker credentials configuration '''

host_name = 'remote_server_hostman'
port  = 22
username = 'username'
password = 'password'






def initialize_docker_client(remote_host_ip, port):
    return docker.DockerClient(base_url=f"tcp://{remote_host_ip}:{port}")

def check_remote_docker_listing(remote_host_ip, port):
    client = initialize_docker_client(remote_host_ip, port)
    containers = client.containers.list(all=True)
    return containers

def get_file_from_remote_docker_daemon(remote_host_ip, port, path):
    client = initialize_docker_client(remote_host_ip, port)
    containers = check_remote_docker_listing(remote_host_ip, port)
    container_id = containers[0].id if containers else None
    if container_id:
        container = client.containers.get(container_id)
        print(container)
        # command = "ls -lR /" #["ls", "-lR", "/"] #Recusively list all the files starting from root
        command = f"ls -l {path}"
        output = container.exec_run(command)
        files = output.output.decode('utf-8').split('\n')
        return [file.split()[-1] for file in files[1:-1]]
    else:
        print("No containers found.")

# result = get_file_from_remote_docker_daemon("15.207.97.170", "2375", "bin")
# print(result)





# Connect to the remote server
# client = paramiko.SSHClient()
# client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# # client.connect(hostname, port, username, password)

# # Edit the Docker configuration file
# stdin, stdout, stderr = client.exec_command('echo \'{"hosts": ["tcp://0.0.0.0:<your_port>", "unix:///var/run/docker.sock"]}\' | sudo tee /etc/docker/daemon.json')

# # Restart Docker
# stdin, stdout, stderr = client.exec_command('sudo systemctl restart docker')

# # Print the output of the commands
# print(stdout.read().decode())
# print(stderr.read().decode())

# # Close the SSH connection
# client.close()


# # Install Docker
# stdin, stdout, stderr = client.exec_command('curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh')

# # Print the output of the installation process
# print(stdout.read().decode())
# print(stderr.read().decode())

# # Close the SSH connection
# client.close()