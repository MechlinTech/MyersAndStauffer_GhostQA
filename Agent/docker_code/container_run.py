from .client import get_client
import os
import threading
from code_management.api_call import update_container_after_run
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



def jmeter_container(name, volume_path,Jthreads=10,Jrampup=10,container_run=None, job):
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
        thread = threading.Thread(target=monitor_jmx_docker_conatiner_With_live_reporting, args=(container,container_run.id,volume_path,))
        thread.start()
    return container