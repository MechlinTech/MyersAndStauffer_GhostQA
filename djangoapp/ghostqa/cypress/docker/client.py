

import docker
from django.conf import settings

import logging
logger = logging.getLogger(__name__)

def get_client():
    DOCKER_HOST = getattr(settings, 'DOCKER_HOST',None)
    
    if DOCKER_HOST:

        client = docker.DockerClient(base_url=DOCKER_HOST)
        return client
    else:
        logging.error(f"This Condition should not be used in AWS but only on localhost")
        client = docker.from_env()
        return client
