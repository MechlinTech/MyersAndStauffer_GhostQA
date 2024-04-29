import requests, json

def get_job_to_execute():
    api_url = 'http://127.0.0.1:8000/codeengine/api/remote-agent-connection-job/queued_job/'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        job_data = response.json()
        print(json.dumps(job_data, indent=4))
        return job_data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching job data: {e}")
        return None
    
get_job_to_execute()

def update_container_run(container_run_ref, file_path):
    container_run_update_url = f"http://127.0.0.1:8000/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
    files = {'test_file': open(file_path, 'rb')}
    response = requests.put(container_run_update_url, files=files)
    # Check response status code and handle exceptions if necessary
    return response

def update_container_after_run(container_run_ref, container_id, container_status, container_short_id, container_label=""):
    container_run_update_url = f"http://127.0.0.1:8000/codeengine/api/remote-agent-connection-jmeter-container/{container_run_ref}/"
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
    url = f'http://127.0.0.1:8000/codeengine/api/remote-agent-connection-jmeter-container/{ref}/'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to get container: {response.status_code}")