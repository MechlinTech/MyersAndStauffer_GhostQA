from .utils import create_directory, get_full_path, convert_to_unix_path, list_files_in_directory,copy_files_and_folders
# from utils import *
from django.conf import settings
import xml.etree.ElementTree as ET
import os
import requests
from rest_framework.response import Response
from docker_code.container_run import jmeter_container
from django.core.files.base import File
from code_management.api_call import update_container_run
from django.http import JsonResponse, HttpResponse

def download_file(url, destination):
    response = requests.get(url)
    with open(destination, "wb") as file:
        file.write(response.content)
        
        
def replace_thread_group(jmx_content,jmx_properties={}):
    root = ET.fromstring(jmx_content)
    print(root)
    # Create the new ConcurrencyThreadGroup element with default values
    new_thread_txt = f'''
        <com.blazemeter.jmeter.threads.concurrency.ConcurrencyThreadGroup guiclass="com.blazemeter.jmeter.threads.concurrency.ConcurrencyThreadGroupGui" testclass="com.blazemeter.jmeter.threads.concurrency.ConcurrencyThreadGroup" testname="Login_Script" enabled="true">
            <elementProp name="ThreadGroup.main_controller" elementType="com.blazemeter.jmeter.control.VirtualUserController"/>
            <stringProp name="Hold">{jmx_properties.get("durations",0)}</stringProp>
            <stringProp name="Steps">{jmx_properties.get("jrampup_steps",10)}</stringProp>
            <stringProp name="RampUp">{jmx_properties.get("jrampup_time",10)}</stringProp>
            <stringProp name="TargetLevel">{jmx_properties.get("jthreads_total_user",10)}</stringProp>
            <stringProp name="Iterations">{jmx_properties.get("Iterations",0)}</stringProp>
            <stringProp name="Unit">S</stringProp>
            <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        </com.blazemeter.jmeter.threads.concurrency.ConcurrencyThreadGroup>
    '''
    
    # hold -> duration
    # RampUp -> RampUp Time
    # Steps -> RampUp Steps
    # TargetLevel -> Total User
    # 
    
    new_thread_group = ET.fromstring(new_thread_txt)


    # Find the existing ThreadGroup element
    thread_group = root.find(".//ThreadGroup")
    if thread_group is None:
        thread_group = root.find(".//com.blazemeter.jmeter.threads.concurrency.ConcurrencyThreadGroup")
        
    if thread_group:
        new_thread_group.tail = thread_group.tail
        thread_group.clear()
        thread_group.tag = new_thread_group.tag
        thread_group.attrib = new_thread_group.attrib
        thread_group.text = new_thread_group.text
        thread_group.tail = new_thread_group.tail

        for child in new_thread_group:
            thread_group.append(child)

    modified_jmx_content = ET.tostring(root, encoding="unicode")

    return modified_jmx_content
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Agent.settings')
# from docker_code.container_run import jmeter_container   
# def setup_jmeter_files(instance, container_run, request_data):
def setup_jmeter_files(job):
    print(type(job))
    BASE_DIR = settings.BASE_DIR
    JMETER_CONFIG_PATH = os.path.abspath(os.path.join(BASE_DIR, "jmeter"))
    
    name = job['container_run'][0]['container_name']
    volume_path = f"/tests/performace/{name}"
    volume_path = get_full_path(volume_path)
    volume_path = convert_to_unix_path(volume_path)
    if settings.SHARED_PERFORMACE_PATH:
        volume_path = f"{settings.SHARED_PERFORMACE_PATH}/performace/{name}"
    
    if job['field_type'] == "jmeter":
        create_directory(f"{volume_path}")
        copy_files_and_folders(JMETER_CONFIG_PATH, volume_path)
        create_directory(f"{volume_path}/html-results")
        
        test_file = job['performance_details']['test_file']
        if test_file.startswith('http'):
            file_name = os.path.basename(test_file)
            file_path = os.path.join(volume_path, file_name)
            download_file(test_file, file_path)
            test_file = file_path
        
        # with open(f"{volume_path}/test.jmx", "w") as file:
        #     jmx_text_content = replace_thread_group(job['performance_details']['test_file'].read(), jmx_properties=job['performance_details'])
        #     file.write(jmx_text_content)
        with open(test_file, "r") as file:
            jmx_text_content = replace_thread_group(file.read(), jmx_properties=job['performance_details'])
    
        with open(f"{volume_path}/test.jmx", "w") as file:
            file.write(jmx_text_content)
        
        container_run_ref = job['container_run'][0]['ref']
        update_container_run(container_run_ref, f"{volume_path}/test.jmx")
            
        container =jmeter_container(name, volume_path, job, job['performance_details']['jthreads_total_user'], job['performance_details']['jrampup_time'], job['container_run'])
        print("Container : ", container)  
        # jmeter_container = jmeter_container(name, [job['performance_details']['jthreads_total_user']], job['performance_details']['jrampup_time'], job['container_run'])
    return Response({
            "status":   "success",
            'jmeter':container
        })
    # start_jmeter_test2(name,volume_path,instance.jthreads_total_user,instance.jrampup_time,container_run)
