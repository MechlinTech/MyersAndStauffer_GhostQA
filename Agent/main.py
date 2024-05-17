from code_management.api_call import get_job_to_execute
from time import sleep
from code_management.jmeter_file_setup import setup_jmeter_files
from code_management.cypress_file_setup import setup_cypress_file
import requests
from code_management.api_call import update_job_status

import argparse
import os




        
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

def main(agent_id, token):
    while True:
        sleep(3)
        job = get_job_to_execute(agent_id, token)
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
    # agent_id = 'b06dc431-4161-41e0-9b4e-4c9378ac6911'
    # token = '49313a00-7111-4dca-9fbf-886be8b39d3f'
    agent_id = os.getenv('AGENT_ID')
    token = os.getenv('TOKEN')
    if not agent_id or not token:
        parser = argparse.ArgumentParser()
        parser.add_argument("agent_id", help="Agent ID to use for job execution")
        parser.add_argument("token", help="Token associated with agent")
        args = parser.parse_args()
        agent_id = args.agent_id
        token = args.token
    if not agent_id and not token:
        raise ValueError("Agent ID and token are required.")
    main(agent_id, token)
# job['performance_details']['jthreads_total_user']
# python main.py  agent token