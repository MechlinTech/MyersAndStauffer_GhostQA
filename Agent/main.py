from code_management.api_call import get_job_to_execute
from time import sleep
from code_management.jmeter_file_setup import setup_jmeter_files
from code_management.cypress_file_setup import setup_cypress_file
import requests
def send_result_to_api(result):
    api_endpoint = "http://127.0.0.1:8000/codeengine/api/remote-agent-connection-job/receive_data/"
    print(type(result),result )
    # response = requests.post(api_endpoint, json=result)

    if response.status_code == 200:
        print("Result sent successfully")
    else:
        print(f"Error sending result: {response}")
        
def execute_jmeter_job(job):
    # jmeter_file_data = setup_jmeter_files(job['performance_details']['name'], job['performance_details']['test_file'], job['container_run'])
    jmeter_file_data = setup_jmeter_files(job)
    return jmeter_file_data

def execute_cypress_job(job):
    setup_cypress_files = setup_cypress_file(job)
    return setup_cypress_files

def main():
    while True:
        sleep(3)
        job = get_job_to_execute()
        print(job)
        result = {}
        if job and 'field_type' in job:
            if job['field_type'] == 'jmeter':
                result['jmeter_result'] = execute_jmeter_job(job)
                result['job'] = job
            elif job['field_type'] == 'testlab':
                execute_cypress_job(job)
            else:
                pass
        if result:
            send_result_to_api(result)
    
                
    
if __name__ == "__main__":
    main()
# job['performance_details']['jthreads_total_user']