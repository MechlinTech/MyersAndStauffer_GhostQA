from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from .models import AgentDetails, Job, PrivateLocation, Agent
from .serializers import AgentSerializer, JobSerializer, JmeterTestContainersRunsSerializer, JmeterTestContainersRunsSerializerNew, PrivateLocationSerializer, NewAgentSerializer
from performace_test.models import JmeterTestContainersRuns, TestContainersRuns
from performace_test.serializers.performace_tests import TestContainersRunsSerializer

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
    
class JmeterTestContainerRunsViewSet(viewsets.ModelViewSet):
    queryset = TestContainersRuns.objects.all()
    serializer_class = JmeterTestContainersRunsSerializerNew
    lookup_field = 'ref'
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     job = serializer.save()

    #     return Response(self.get_serializer(job).data)
    
    @action(detail=False,methods=['GET'])
    def queued_job(self, request):
        queued_job = Job.objects.filter(job_status='queued').order_by('created_at').first()
        if queued_job:
            serializer = self.get_serializer(queued_job)
            return Response(serializer.data)
        else:
            return Response(status=404, data={'message': 'No queued jobs found'})
    @action(detail=False, methods=['POST'])    
    def receive_data(self, request):
        data = request.data
        return Response({'message': 'Data received successfully', 'data': data}) 
    
    
class PrivateLocationViewSet(viewsets.ModelViewSet):
    queryset = PrivateLocation.objects.all()
    serializer_class = PrivateLocationSerializer
    lookup_field = 'ref'