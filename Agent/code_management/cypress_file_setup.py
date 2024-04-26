from .utils import create_directory, get_full_path, convert_to_unix_path, list_files_in_directory,copy_files_and_folders
from django.conf import settings
import xml.etree.ElementTree as ET
import os
import requests
from rest_framework.response import Response
from django.core.files.base import File
from django.http import JsonResponse, HttpResponse
from .build_cypress import generate_test_cases
from docker_code.container_run import cypress_container


def setup_cypress_file(job):

    BASE_DIR  = settings.BASE_DIR
    CYPRESS_CONFIG_PATH = os.path.abspath(os.path.join(BASE_DIR,"cypress"))
    name = job['cypress_container_run']['container_name']
    
    volume_path = f"/automation-tests/{name}/cypress"
    volume_path = get_full_path(volume_path)
    volume_path = convert_to_unix_path(volume_path)
    if settings.SHARED_PATH:
            volume_path = f"{settings.SHARED_PATH}/{name}/cypress"
    print(f"{__name__}: volume_path: {volume_path}")
    
    create_directory(f"{volume_path}")
    copy_files_and_folders(CYPRESS_CONFIG_PATH,volume_path)       
    create_directory(f"{volume_path}/e2e/cypress/e2e/")
    
    for suite_name, suite_content in job['test_suite_details']['cypress_code'].items():
            print(suite_name)
            with open(f"{volume_path}/e2e/cypress/e2e/{suite_name}", "w") as cypress_test_file:
                cypress_test_file.write(suite_content)
        
    # with open(
    #         f"{volume_path}/e2e/cypress/e2e/{suites['name']}.cy.js", "w"
    #     ) as cypress_test_file:

    #         cypress_test_file.write(job['test_suite_details']['cypress_code'])
            
    container = cypress_container(name, volume_path,job['cypress_container_run'])
    return Response({
            "status":   "success",
            'jmeter':container
        })
