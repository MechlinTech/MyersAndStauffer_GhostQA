from .client import get_client
import os
import time
import pandas as pd
import json
import threading
from code_management.api_call import (
                                    update_container_after_run,
                                    get_container_from_codeengine,
                                    update_container_reporting,
                                    update_container_for_raw_data,
                                    update_container_for_json_data,
                                    final_update_container_after_execution,
                                    update_container_after_container_run,
                                    get_container_from_codeengine_cypress,
                                    update_container_reporting_cypress,
                                    artificat_creation_cypress,
                                    update_artifact_file,
                                    update_container_json_result_data_cypress,
                                    final_update_container_after_execution_cypress,
                                    upload_cypress_artifact_video
)
from code_management.utils import directory_exists, list_files_in_directory, list_recurssive_files_in_directory

from system_info import get_system_info, construct_system_info_data

import logging  
logger = logging.getLogger(__name__)

def get_container(id_or_name):
    client = get_client()
    
    return client.containers.get(id_or_name)

def cypress_container(name, volume_path,job,container_run=None):
    client = get_client()
    # print('volume_path',volume_path)
    print(f"{__name__}: volume_path: {volume_path}")
    
    # Build the Docker image from the Dockerfile
    # image, build_logs = client.images.build(path=volume_path, dockerfile=os.path.join(volume_path,'Dockerfile'), tag='ghost_qa_cypress')
    image = client.images.pull('ghostqa/cypress:latest')
    # try:
    #     for log in build_logs:
    #         print("LOGS:",log)
    # except Exception as e:
    #     print("Exception",e)
        
        
    container = client.containers.run(
        image=image,
        name=name,
        # remove=True,
        command='cypress run --reporter mochawesome --reporter-options reportDir="cypress/results",overwrite=false,html=false,json=true',
        tty=True,
        working_dir="/e2e",
        volumes={
            os.path.join(volume_path,'e2e','cypress'): {'bind': '/e2e/cypress', 'mode': 'rw'},
            os.path.join(volume_path,'e2e','cypress.config.js'): {'bind': '/e2e/cypress.config.js', 'mode': 'rw'}
        },
        detach=True,
    )
    
    container_id = container.id
    container_status = container.status
    container_labels = ""
    container_short_id = container.short_id
    update_container_after_container_run(container_run['ref'], container_id, container_status, container_labels, container_short_id)
    related_container_details_cypress = get_container_details_cypress(container,container_run['ref'], volume_path, job)
    return container, related_container_details_cypress


from code_management.jmx_reporting import csv_to_json, get_json_metrics

# def live_update_from_container(container_run,logs_path):
#         try:
#             raw_data = csv_to_json(logs_path)
#             container_run.raw_data = raw_data
#             container_run.save()
#             data = get_json_metrics(logs_path)
#             container_run.json = data
#             container_run.save()
#         except pd.errors.EmptyDataError as pe: 
#             pass   
#         except Exception as e:
#             logger.exception(e)

# def monitor_jmx_docker_conatiner_With_live_reporting(container_originally_ran,container_id,volume_path):
def monitor_jmx_docker_conatiner_With_live_reporting(container,container_run,volume_path):
    # Simulate a time-consuming task
    while True:
        try:
            
            # container_run = TestContainersRuns.objects.get(id=container_id)
            container_run = get_container_from_codeengine(container_run)
            container =  get_container(container.container_id)
            
            if container:
                # container_run.container_id = container.id
                # container_run.container_status = container.status
                # container_run.container_labels = ""
                # container_run.container_short_id = container.short_id
                container_id = container.id
                container_status = container.status
                container_labels = ""
                container_short_id = container.short_id
                update_container_after_run(container_run['ref'], container_id, container_status, container_short_id, container_labels)
                # container_run.save()
                
                logs_path = f"{volume_path}/log.csv"
                # live_update_from_container(container_run,logs_path)
                
                if container.status == "exited":
                
                    # container_run.container_logs_str = container.logs()
                    # container_run.save()
                    
                    result ={
                        "logs":[],
                        "statistics":[],
                        "html_zip":[],
                    }
                    logs_path = f"{volume_path}/log.csv"
                    statistics_path = f"{volume_path}/html-results/statistics.json"
                    html_path = f"{volume_path}/html-results"
                    print('monitor_jmx_docker_conatiner: logs_path',logs_path)
                    print('monitor_jmx_docker_conatiner: statistics_path',statistics_path)
                    # test_artifact_instance = TestArtifacts.objects.create(
                    #     container_runs=container_run,
                    #     suite=container_run.suite,
                    #     type='logs',  # Replace with the actual type
                    # )
                    # print('monitor_jmx_docker_conatiner: test_artifact_instance:' ,test_artifact_instance)
                    with open(logs_path, 'rb') as file:
                        # test_artifact_instance.files.save(os.path.basename(file.name), File(file))
                        # test_artifact_instance.save()
                        print('monitor_jmx_docker_conatiner: file:' , file)
                        raw_data = csv_to_json(logs_path)
                        # container_run.raw_data = raw_data
                        # container_run.save()
                    
                    # test_artifact_instance = TestArtifacts.objects.create(
                    #     container_runs=container_run,
                    #     suite=container_run.suite,
                    #     type='statistics',  # Replace with the actual type
                    # )
                    with open(statistics_path, 'rb') as file:
                        # test_artifact_instance.files.save(os.path.basename(file.name), File(file))
                        # test_artifact_instance.save()
                        # file_data = test_artifact_instance.files.read().decode('utf-8')
                        file_data = file.read().decode('utf-8')
                        data = json.loads(file_data)
                        # container_run.json = data
                        # container_run.save()
                        
                    
                    # test_artifact_instance = TestArtifacts.objects.create(
                    #     container_runs=container_run,
                    #     suite=container_run.suite,
                    #     type='html_zip',  # Replace with the actual type
                    # )
                    # with open(logs_path, 'rb') as file:
                    #     test_artifact_instance.files.save(os.path.basename(file.name), File(file))
                    #     test_artifact_instance.save()
                        
                                      
                    container.remove()
                    
                    print(container.status)
                    break
              
            time.sleep(1)      
       
        except Exception as e:
            print("Exception",e)
            logger.exception(e)
            break


def jmeter_container(name, volume_path, job ,Jthreads=10,Jrampup=10,container_run=None):
    client = get_client()
    if client:
        logger.info("Docker client is available")
    else:
        logger.error("Docker client is not available")
    # print('volume_path',volume_path)
    print(f"{__name__}: volume_path: {volume_path}")
    
    # Build the Docker image from the Dockerfile
    # image, build_logs = client.images.build(path=volume_path, dockerfile=os.path.join(volume_path,'Dockerfile'), tag='jmeter_apline')
    image = client.images.pull('ghostqa/performace:latest')
    # volume_path = volume_path[len('/tests'):]
    container = client.containers.run(
        image=image,
        name=name,
        remove=False,
        command=f'-Jthreads={Jthreads} -Jrampup={Jrampup} -n -t {volume_path}/test.jmx -l {volume_path}/log.csv -e -o {volume_path}/html-results',
        tty=True,
         volumes={
        '~agent-data': {'bind': volume_path, 'mode': 'rw'},
        # f"{volume_path}/bin/filename.csv": {'bind': '/opt/apache-jmeter-5.6.3/bin/filename.csv', 'mode': 'rw'}
        },
        detach=True,
    )
    
    # if container_run:
    #     container_run.container_id = container.id
    #     container_run.container_status = container.status
    #     container_run.container_labels = ""
    #     container_run.container_short_id = container.short_id
    #     container_run.save()
    
    system_info = get_system_info()
    construct_system_info_data(job['agent_details']['location']['id'], job['agent_details']['id'], job['id'], 'on-execution', container_run[0]['ref'], system_info)
    
    container_id = container.id
    container_status = container.status
    container_short_id = container.short_id
    update_container_after_run(container_run[0]['ref'], container_id, container_status, container_short_id)
    related_container_details = get_container_details(container, container_run[0]['ref'], volume_path)
                # Start the threaded task
    # thread = threading.Thread(target=monitor_jmx_docker_conatiner_With_live_reporting, args=(container,container_run.id,volume_path,))
    # thread = threading.Thread(target=monitor_jmx_docker_conatiner_With_live_reporting, args=(container,container_run['ref'],volume_path,))
    # thread.start()
    return container, related_container_details

# def get_container_details(container, ref, volume_path):
#     container_run = get_container_from_codeengine(ref)
#     container_details =  get_container(container_run['container_id'])
    
#     while container_details.status != "exited":
#         time.sleep(30)  # Wait for 30 seconds
#         container_details = get_container(container_run['container_id'])
        
        
#     container_status = container_details.status
#     container_labels = container_details.labels
    
#     update_container_reporting(container_run['ref'], container_status, container_labels)
    
#     logs_path = f"{volume_path}/log.csv"
#     statistics_path = f"{volume_path}/html-results/statistics.json"
#     html_path = f"{volume_path}/html-results"
    
#     raw_data = csv_to_json(logs_path)
#     raw_data = json.dumps(raw_data)
#     update_container_for_raw_data(container_run['ref'], raw_data)
    
#     data = get_json_metrics(logs_path)
#     json_data = json.dumps(data)
#     update_container_for_json_data(container_run['ref'], json_data)
    
    
#     with open(logs_path, 'rb') as file:
#         print('monitor_jmx_docker_conatiner: file:', file.read())
#         # raw_data = csv_to_json(logs_path)
#         # container_run.raw_data = raw_data
#         # update the container for raw data

#     with open(statistics_path, 'rb') as file:
#         print('monitor_jmx_docker_conatiner: file:', file.read())
#         # file_data = file.read().decode('utf-8')
#         # data = json.loads(file_data)
#         # container_run.json = data
#         # update the container for json data
        
        
        

#     # with open(html_path, 'rb') as file:
#     #     print('monitor_jmx_docker_conatiner: file:', file.read())
#     container_status = container_details.status
#     final_update_container_after_execution(container_run['ref'], container_status)  
#     container.remove()
#     print(container.status)
#     return True

def get_container_details(container, ref, volume_path):
    container_run = get_container_from_codeengine(ref)
    container_details = get_container(container_run['container_id'])
    
    # logs_path = f"{volume_path}/log.csv"
    # statistics_path = f"{volume_path}/html-results/statistics.json"
    # html_path = f"{volume_path}/html-results"
    
    while True:
        time.sleep(30)
        logger.info("Liver reporting result")
        # Perform live reporting while container is running
        container_status = container_details.status
        container_labels = container_details.labels
        
        update_container_reporting(container_run['ref'], container_status, container_labels)
        
        try:
            logs_path = f"{volume_path}/log.csv"
            logger.info(f"logs_path: {logs_path}")
            statistics_path = f"{volume_path}/html-results/statistics.json"
            logger.info(f"statistics_path: {statistics_path}")
            html_path = f"{volume_path}/html-results"
            logger.info(f"html_path: {html_path}")
            
            raw_data = csv_to_json(logs_path)
            raw_data = json.dumps(raw_data)
            update_container_for_raw_data(container_run['ref'], raw_data)
            
            data = get_json_metrics(logs_path)
            json_data = json.dumps(data)
            update_container_for_json_data(container_run['ref'], json_data)
            
            with open(logs_path, 'rb') as file:
                print('monitor_jmx_docker_conatiner: file:', file.read())
            
            with open(statistics_path, 'rb') as file:
                print('monitor_jmx_docker_conatiner: file:', file.read())
        except Exception as e:
            print(f"Error during live reporting: {e}")
        
        time.sleep(3)  # Wait for 30 seconds before the next status check
        container_details = get_container(container_run['container_id'])

        # Check if the container has exited
        if container_details.status == "exited":
            break
    
    # Final reporting once the container has exited
    time.sleep(30)
    try:
        logger.info("Final reporting result")
        logs_path = f"{volume_path}/log.csv"
        logger.info(f"logs_path: {logs_path}")
        statistics_path = f"{volume_path}/html-results/statistics.json"
        logger.info(f"statistics_path: {statistics_path}")
        html_path = f"{volume_path}/html-results"
        logger.info(f"html_path: {html_path}")
        
        raw_data = csv_to_json(logs_path)
        raw_data = json.dumps(raw_data)
        update_container_for_raw_data(container_run['ref'], raw_data)
        
        data = get_json_metrics(logs_path)
        json_data = json.dumps(data)
        update_container_for_json_data(container_run['ref'], json_data)
        
        with open(logs_path, 'rb') as file:
            print('monitor_jmx_docker_conatiner: file:', file.read())
        
        with open(statistics_path, 'rb') as file:
            print('monitor_jmx_docker_conatiner: file:', file.read())
    except Exception as e:
        print(f"Error during final reporting: {e}")
    
    final_update_container_after_execution(container_run['ref'], container_details.status)
    container.remove()
    print(container.status)
    return True

        
def get_container_details_cypress(container,ref, volume_path, job):
    
    container_run = get_container_from_codeengine_cypress(ref)
    container_details =  get_container(container_run['container_id'])
    
    while container_details.status != "exited":
        time.sleep(30)  # Wait for 30 seconds
        container_details = get_container(container_run['container_id'])
    
    container_status = container_details.status
    container_labels = container_details.labels
    container_log_str = container_details.logs()
    
    update_container_reporting_cypress(ref, container_status, container_labels, container_log_str)
    
    result ={
            "screenshots":[],
            "videos":[],
            "results":[],
        }
    
    screenshots_path = f"{volume_path}/e2e/cypress/screenshots/"
    videos_path = f"{volume_path}/e2e/cypress/videos"
    results_path = f"{volume_path}/e2e/cypress/results"
    
    if directory_exists(screenshots_path):
        screenshots = list_recurssive_files_in_directory(screenshots_path)
        result["screenshots"] = screenshots
        
    if directory_exists(videos_path):
        videos = list_files_in_directory(videos_path)
        result["videos"] = videos
    
    if directory_exists(results_path):
        results = list_files_in_directory(results_path)
        result["results"] = results
    
    for screenshot in result["screenshots"]:
        print(screenshot)
        test_artifact_instance = artificat_creation_cypress(
            container_runs=container_run,
            suite=container_run.suite,
            type='screenshot',  # Replace with the actual type
        )
        update_artifact_file(test_artifact_instance, screenshot)
        
    json_result_data = {}
    for result_json in result["results"]:
        test_artifact_instance = artificat_creation_cypress(job['cypress_container_run']['id'], job['test_suite'], 'result')
        updated_file_data = update_artifact_file(test_artifact_instance['id'], result_json)
        try:
            suite_name = updated_file_data.get('results')[0]['file']
            path_parts = suite_name.split("/")
            file_name = path_parts[-1]
            file_name_parts = file_name.split(".")
            test_suite_name = file_name_parts[0]
            json_result_data[test_suite_name] = updated_file_data
        except Exception as e:
            json_result_data[result_json] = updated_file_data
        # try:
        #     data = json.loads(updated_file_data)
        #     suite_name = data.get('results')[0]['file']
        #     path_parts = suite_name.split("/")
        #     file_name = path_parts[-1]
        #     file_name_parts = file_name.split(".")
        #     test_suite_name = file_name_parts[0]
        #     json_result_data[test_suite_name] = data
        # except Exception as e:
        #     json_result_data[result_json] = updated_file_data
            
    update_container_json_result_data_cypress(ref, json_result_data)
    
    for video in result["videos"]:
        print(video)
        test_artifact_instance = artificat_creation_cypress(job['cypress_container_run']['id'], job['test_suite'], 'video')
        upload_cypress_artifact_video(test_artifact_instance['id'], video)
    
    container_status = container_details.status
    final_update_container_after_execution_cypress(ref, container_status)  
    container.remove()
    
    print(container.status)
    
    return True
