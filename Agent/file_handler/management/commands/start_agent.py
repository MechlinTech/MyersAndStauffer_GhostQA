from django.core.management.base import BaseCommand, CommandError
from code_management.api_call import get_job_to_execute
from time import sleep
from code_management.jmeter_file_setup import setup_jmeter_files
from code_management.cypress_file_setup import setup_cypress_file
import requests
from code_management.api_call import update_job_status

# def send_result_to_api(result):
#     api_endpoint = "http://127.0.0.1:8000/codeengine/api/remote-agent-connection-job/receive_data/"
#     print(type(result),result )
#     # response = requests.post(api_endpoint, json=result)

#     if response.status_code == 200:
#         print("Result sent successfully")
#     else:
#         print(f"Error sending result: {response}")
        
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

def main():
    while True:
        sleep(3)
        job = get_job_to_execute()
        print(job)
        result = {}
        if job and 'field_type' in job:
            if job['field_type'] == 'jmeter':
                result = execute_jmeter_job(job)
                    
                result['job'] = job
            elif job['field_type'] == 'testlab':
                execute_cypress_job(job)
            else:
                pass

class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)

    def handle(self, *args, **options):
        main()
