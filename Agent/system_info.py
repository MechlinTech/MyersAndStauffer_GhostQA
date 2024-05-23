import psutil
import requests
import os
from dotenv import load_dotenv
import logging

load_dotenv()

BASE_URL = os.getenv('BASE_URL')


def get_system_info():
    #CPU usage
    cpu_usage = psutil.cpu_percent(interval=1)

    # get Memory usage
    memory_info = psutil.virtual_memory()
    total_memory = memory_info.total / (1024 ** 3) # byte to GB
    available_memory = memory_info.available / (1024 ** 3) # byte to GB
    used_memory = memory_info.used / (1024 ** 3) # byte to GB
    memory_usage_percent = memory_info.percent
    
    net_io = psutil.net_io_counters()
    bytes_sent = net_io.bytes_sent / (1024 ** 2)  # Convert bytes to MB
    bytes_recv = net_io.bytes_recv / (1024 ** 2)  # Convert bytes to MB
    
    data = {
        'cpu_usage': f"{cpu_usage}%",
        'total_memory_gb': f"{total_memory:.2f} GB",
        'available_memory_gb': f"{available_memory:.2f} GB",
        'used_memory_gb': f"{used_memory:.2f} GB",
        'memory_usage_percent': f"{memory_usage_percent}%",
        'bytes_sent_mb': f"{bytes_sent:.2f} MB",
        'bytes_received_mb': f"{bytes_recv:.2f} MB"
    }
    
    return data
import time
def send_system_info_to_server(data):
    api_url = f"{BASE_URL}/codeengine/api/agent-job/get_agent_system_info/"
    # api_url = "http://127.0.0.1:8000//codeengine/api/agent-job/get_agent_system_info/"
    response = requests.post(api_url, json=data)
    print("data:", response.json())
    logging.info(f"Response from server: {response.text}")
    

if __name__ == "__main__":
    while True:
        time.sleep(5)
        system_info = get_system_info()
        print("####",system_info)
        send_system_info_to_server(system_info)