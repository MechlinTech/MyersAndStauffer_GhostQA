from django.shortcuts import render, get_object_or_404

# Create your views here.

from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from .models import AgentDetails, Job, PrivateLocation, Agent, LoadDistribution, CustomToken, SystemInfo
from .serializers import(
            AgentSerializer, JobSerializer,
            JmeterTestContainersRunsSerializer,
            JmeterTestContainersRunsSerializerNew,
            PrivateLocationSerializer, NewAgentSerializer,
            LoadDistributionSerializer, AgentListSerializer,
            SystemInfoSerializer
        )
from performace_test.models import JmeterTestContainersRuns, TestContainersRuns
from performace_test.serializers.performace_tests import TestContainersRunsSerializer
import psutil
from rest_framework import status

class AgentViewSet(viewsets.ModelViewSet):
    queryset = AgentDetails.objects.all()
    serializer_class = AgentSerializer
    
    
class NewAgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = NewAgentSerializer
    lookup_field = 'ref'

# class JmeterTestContainersRunsViewSet(viewsets.ModelViewSet):
#     queryset = JmeterTestContainersRuns.objects.all()
#     serializer_class = JmeterTestContainersRunsSerializer
#     lookup_field = 'ref'



class LoadDistributionViewSet(viewsets.ModelViewSet):
    queryset = LoadDistribution.objects.all()
    serializer_class = LoadDistributionSerializer
    lookup_field = 'ref'

    
class JmeterTestContainerRunsViewSet(viewsets.ModelViewSet):
    queryset = TestContainersRuns.objects.all()
    serializer_class = JmeterTestContainersRunsSerializerNew
    lookup_field = 'ref'
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    latest_system_info = {}
    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     job = serializer.save()

    #     return Response(self.get_serializer(job).data)
    
    @action(detail=False,methods=['GET'], url_path='queued-jobs-without-agentID')
    def queued_job_without_agentid(self, request):
        queued_job = Job.objects.filter(job_status='queued').order_by('created_at')
        if queued_job.exists():
            serializer = self.get_serializer(queued_job, many=True)
            return Response(serializer.data)
        else:
            return Response(status=404, data={'message': 'No queued jobs found'})
    
    @action(detail=False, methods=['GET'])
    def queued_job(self, request):
        agent_id = request.query_params.get('agent_id')
        token = request.query_params.get('token')
        if not agent_id:
            return Response(status=400, data={'message': 'Agent ID is required'})
        
        agent = CustomToken.validate_token(token)
        if not agent:
            return Response(status=401, data={'message': 'Invalid token or token expired'})
        
        agent_id = get_object_or_404(Agent, ref=agent_id)

        if agent.id != agent_id.id:
            return Response(status=401, data={'message': 'Token does not match the agent'})

        queued_job = Job.objects.filter(agent=agent_id, job_status='queued').order_by('created_at').first()
        if queued_job:
            serializer = self.get_serializer(queued_job)
            return Response(serializer.data)
        else:
            return Response(status=404, data={'message': 'No queued jobs found for this agent'})
    @action(detail=False, methods=['POST'])    
    def receive_data(self, request):
        data = request.data
        return Response({'message': 'Data received successfully', 'data': data})
    
    @action(detail=False, methods=['GET'])
    def system_info(self, request):
        cpu_usage = psutil.cpu_percent(interval=0.3)
        # print(f"CPU Usage : {cpu_usage}")
        # get Memory usage
        memory_info = psutil.virtual_memory()
        total_memory = memory_info.total / (1024 ** 3) # byte to GB
        available_memory = memory_info.available / (1024 ** 3) # byte to GB
        used_memory = memory_info.used / (1024 ** 3) # byte to GB
        memory_usage_percent = memory_info.percent
        # print(f"Total Memory: {total_memory:.2f} GB")
        # print(f"Available Memory: {available_memory:.2f} GB")
        # print(f"Used Memory: {used_memory:.2f} GB")
        # print(f"Memory Usage: {memory_usage_percent}%")
        
        net_io = psutil.net_io_counters()
        bytes_sent = net_io.bytes_sent / (1024 ** 2)  # Convert bytes to MB
        bytes_recv = net_io.bytes_recv / (1024 ** 2)  # Convert bytes to MB
        # print(f"Bytes Sent: {bytes_sent:.2f} MB")
        # print(f"Bytes Received: {bytes_recv:.2f} MB")
        
        data = {
            'cpu_usage': f"{cpu_usage}%",
            'total_memory_gb': f"{total_memory:.2f} GB",
            'available_memory_gb': f"{available_memory:.2f} GB",
            'used_memory_gb': f"{used_memory:.2f} GB",
            'memory_usage_percent': f"{memory_usage_percent}%",
            'bytes_sent_mb': f"{bytes_sent:.2f} MB",
            'bytes_received_mb': f"{bytes_recv:.2f} MB"
        }
        
        return Response({
            'message': 'successfully fetched!',
            'data':data
        })
    
class PrivateLocationViewSet(viewsets.ModelViewSet):
    queryset = PrivateLocation.objects.all()
    serializer_class = PrivateLocationSerializer
    lookup_field = 'ref'
    
    @action(detail=False, methods=['GET'])
    def agent_details(self, request):
        location = request.query_params.get('location')
        agent = Agent.objects.filter(location__ref=location)
        data = AgentListSerializer(agent, many=True).data
        return Response({'data': data})
    @action(detail=False, methods=['GET'])
    def available_location_with_agent(self, request):
        query = self.queryset.filter(location__agent_status='available').distinct()
        data = self.get_serializer(query, many=True).data
        return Response({'data': data})
         
    
    
class SystemInfoViewSet(viewsets.ModelViewSet):
    queryset = SystemInfo.objects.all()
    serializer_class = SystemInfoSerializer
    lookup_field = 'ref'
    
    @action(detail=False, methods=['get'], url_path='filter-by-job')
    def filter_by_job(self, request):
        job_id = request.query_params.get('job_id')
        if not job_id:
            return Response({"error": "Job ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        filtered_data = self.queryset.filter(job_id=job_id)
        serializer = self.get_serializer(filtered_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
