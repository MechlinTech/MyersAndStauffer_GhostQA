import docker
from django.conf import settings
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')



def get_client():
    try:
        client = docker.from_env()
        ping_response = client.ping()
        logging.info(f"Ping response: {ping_response}")
        return client
    except docker.errors.DockerException as e:
        logging.exception(f"Error connecting to Docker: {e}")
        return None
    # DOCKER_HOST = getattr(settings, 'DOCKER_HOST',None)
    
    # if DOCKER_HOST:

    #     # client = docker.DockerClient(base_url=DOCKER_HOST)
    #     client = docker.from_env()
    #     return client
    # else:
    #     client = docker.from_env()
    #     return client