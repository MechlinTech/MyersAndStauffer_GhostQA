from .client import get_client
import os
import time
import pandas as pd
import json
import threading
from code_management.api_call import update_container_after_run, get_container_from_codeengine
import logging  
logger = logging.getLogger(__name__)

def get_container(id_or_name):
    client = get_client()
    
    return client.containers.get(id_or_name)

def cypress_container(name, volume_path,container_run=None):
    client = get_client()
    # print('volume_path',volume_path)
    print(f"{__name__}: volume_path: {volume_path}")
    
    # Build the Docker image from the Dockerfile
    image, build_logs = client.images.build(path=volume_path, dockerfile=os.path.join(volume_path,'Dockerfile'), tag='ghost_qa_cypress')
    try:
        for log in build_logs:
            print("LOGS:",log)
    except Exception as e:
        print("Exception",e)
        
        
    container = client.containers.run(
        image="ghost_qa_cypress",
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
    
    if container_run:
        container_run.container_id = container.id
        container_run.container_status = container.status
        container_run.container_labels = ""
        container_run.container_short_id = container.short_id
        container_run.save()
        
                # Start the threaded task
        # thread = threading.Thread(target=monitor_docker_conatinerv2, args=(container_run.id,volume_path,))
        # thread.start()
    return container


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
            container =  get_container(container.id)
            
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
                
                    container_run.container_logs_str = container.logs()
                    container_run.save()
                    
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
                        container_run.raw_data = raw_data
                        container_run.save()
                    
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
                        container_run.json = data
                        container_run.save()
                        
                    
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


def jmeter_container(name, volume_path,Jthreads=10,Jrampup=10,container_run=None):
    client = get_client()
    # print('volume_path',volume_path)
    print(f"{__name__}: volume_path: {volume_path}")
    
    # Build the Docker image from the Dockerfile
    image, build_logs = client.images.build(path=volume_path, dockerfile=os.path.join(volume_path,'Dockerfile'), tag='jmeter_apline')

    container = client.containers.run(
        image='jmeter_apline',
        name=name,
        remove=False,
        command=f'-Jthreads={Jthreads} -Jrampup={Jrampup} -n -t /jmeter-scripts/test.jmx -l /jmeter-scripts/log.csv -e -o /jmeter-scripts/html-results',
        tty=True,
         volumes={
        volume_path: {'bind': '/jmeter-scripts', 'mode': 'rw'},
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
    
    container_id = container.id
    container_status = container.status
    container_short_id = container.short_id
    update_container_after_run(container_run['ref'], container_id, container_status, container_short_id)
                # Start the threaded task
    # thread = threading.Thread(target=monitor_jmx_docker_conatiner_With_live_reporting, args=(container,container_run.id,volume_path,))
    thread = threading.Thread(target=monitor_jmx_docker_conatiner_With_live_reporting, args=(container,container_run['ref'],volume_path,))
    thread.start()
    return container