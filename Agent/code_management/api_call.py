import os
import requests, json
import logging
from dotenv import load_dotenv

load_dotenv()

# Configure the logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# BASE_URL = 'http://app.ghostqa.com'
BASE_URL = os.getenv('BASE_URL')


def get_agent_by_ref_to_set_status(ref, status):
    update_agent_status_url = f"{BASE_URL}/codeengine/api/remote-agent-connection/{ref}/"
    payload = {
        'agent_status': status,
    }
    response = requests.patch(update_agent_status_url, data=payload)
    return response

def get_job_to_execute(agent_id, token):
    api_url = f'{BASE_URL}/codeengine/api/agent-job/queued_job/?agent_id={agent_id}&token={token}'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        job_data = response.json()
        print(json.dumps(job_data, indent=4))
        return job_data
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching job data: {e}")
        logger.info('No Agent matches the given query.')
        return None
    
# get_job_to_execute()

def update_container_run(container_run_ref, file_path):
    container_run_update_url = f"{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    files = {'test_file': open(file_path, 'rb')}
    response = requests.put(container_run_update_url, files=files)
    # Check response status code and handle exceptions if necessary
    return response

def update_container_after_run(container_run_ref, container_id, container_status, container_short_id, container_label=""):
    container_run_update_url = f"{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    payload = {
        'container_id': container_id,
        'container_status': container_status,
        'container_short_id': container_short_id
    }
    
    if container_label:
        payload['container_label'] = container_label
    response = requests.put(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def get_container_from_codeengine(ref):
    url = f'{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{ref}/'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to get container: {response.status_code}")
    

def update_container_reporting(container_run_ref, container_status, container_label):
    container_run_update_url = f"{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    payload = {
        'container_status': container_status
    }
    
    if container_label:
        payload['container_label'] = container_label
    response = requests.put(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def update_container_for_raw_data(container_run_ref, raw_data):
    container_run_update_url = f"{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    payload = {
        'raw_data': raw_data
    }
    
    response = requests.put(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def update_container_for_json_data(container_run_ref, json_data):
    container_run_update_url = f"{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    payload = {
        'json': json_data
    }
    
    response = requests.put(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def final_update_container_after_execution(container_run_ref, container_status):
    container_run_update_url = f"{BASE_URL}/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    payload = {
        'container_status': container_status
    }
    
    response = requests.put(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def update_job_status(job_id, status):
    job_update_url = f"{BASE_URL}/codeengine/api/agent-job/{job_id}/"
    payload = {
        'job_status': status
    }
    
    response = requests.patch(job_update_url, data=payload)
    return response

###################################### CYPRESS API CALLS #############################

def update_container_after_container_run(ref, container_id, container_status, container_label, container_short_id):
    container_run_update_url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-container/{ref}/"
    payload = {
        'container_id': container_id,
        'container_status': container_status,
        'container_short_id': container_short_id
    }
    if container_label:
        payload['container_label'] = container_label

    response = requests.patch(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def get_container_from_codeengine_cypress(ref):
    url = f'{BASE_URL}/codeengine/api/test-suitesV2-cypress-container/{ref}/'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to get container: {response.status_code}")
    
def update_container_reporting_cypress(ref, container_status, container_label, container_log_str):
    container_run_update_url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-container/{ref}/"
    payload = {
        'container_status': container_status,
        'container_log_str': container_log_str
    }

    if container_label:
        payload['container_label'] = container_label
    response = requests.patch(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def update_container_json_result_data_cypress(ref, json_data):
    container_run_update_url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-container/{ref}/"
    payload = {
        'json': json_data
    }
    # json_payload = json.dumps(payload)
    response = requests.patch(container_run_update_url, json=payload)
    # Check response status code and handle exceptions if necessary
    return response

def artificat_creation_cypress(container_run, suite, type):
    url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-artifacts/"
    payload = {
        'container_runs': container_run,
        'suite': suite,
        'type': type
    }
    
    response = requests.post(url, json=payload)
    if response.status_code == 201:
        return response.json()
    else:
        raise Exception(f"Failed to create artifact: {response.status_code}")

def update_artifact_file(id, file_path):
    url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-artifacts/{id}/"
    with open(file_path, 'rb') as file:
        file_data = file.read()
        files = {
            'files': (file.name, file_data, 'application/json'),
        }
    response = requests.put(url, files=files)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to update artifact file: {response.status_code}")
    

def upload_cypress_artifact_video(id, file_path):
    url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-artifacts/{id}/"
    with open(file_path, 'rb') as file:
        files = [
            ('files', (file.name, file, 'video/mp4'))  # Provide the correct MIME type if the file is not an mp4
        ]

        response = requests.put(url, files=files)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to upload file: {response.status_code}")

   
def final_update_container_after_execution_cypress(ref, container_status):
    container_run_update_url = f"{BASE_URL}/codeengine/api/test-suitesV2-cypress-container/{ref}/"
    payload = {
        'container_status': container_status
    }

    response = requests.patch(container_run_update_url, data=payload)
    # Check response status code and handle exceptions if necessary
    return response

def add_system_info_in_condeengine(data):
    url = f'{BASE_URL}/codeengine/api/system-info/'
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        logger.info("System info added successfully in codeengine")
        return response.json()
    except requests.exceptions.HTTPError as http_err:
        logger.error(f"Failed to add system info in codeengine: {http_err}")
    except Exception as err:
        logger.error(f"Failed to add system info in codeengine: {err}")