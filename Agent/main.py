from code_management.api_call import get_job_to_execute
from time import sleep
from code_management.jmeter_file_setup import setup_jmeter_files
from code_management.cypress_file_setup import setup_cypress_file
import requests
from code_management.api_call import update_job_status

import argparse





        
def execute_jmeter_job(job):
    # jmeter_file_data = setup_jmeter_files(job['performance_details']['name'], job['performance_details']['test_file'], job['container_run'])
    jmeter_file_data = setup_jmeter_files(job)
    if jmeter_file_data.status_code == 200:
        job_id = job['id']
        status = "completed"
        update_job_status(job_id, status)
    return jmeter_file_data
def execute_cypress_job(job):
    setup_cypress_files = setup_cypress_file(job)
    if setup_cypress_files.status_code == 200:
        job_id = job['id']
        status = "completed"
        update_job_status(job_id, status)
    return setup_cypress_files

def main(agent_id):
    while True:
        sleep(3)
        job = get_job_to_execute(agent_id)
        print(job)
        result = {}
        if job and 'field_type' in job:
            if job['field_type'] == 'jmeter' and job['agent_details']['ref'] == agent_id:
                result = execute_jmeter_job(job)
                    
                result['job'] = job
            elif job['field_type'] == 'testlab' and job['agent_details']['ref'] == agent_id:
                execute_cypress_job(job)
            else:
                pass
        
    
                
    
if __name__ == "__main__":
    # agent_id = '0d37ff92-c9fa-4d35-b805-ba7b7cbfd9af'
    parser = argparse.ArgumentParser()
    parser.add_argument("agent_id", help="Agent ID to use for job execution")
    args = parser.parse_args()
    agent_id = args.agent_id
    main(agent_id)
# job['performance_details']['jthreads_total_user']