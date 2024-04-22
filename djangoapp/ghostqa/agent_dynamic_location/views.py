from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from rest_framework.response import Response
from .models import AgentDetails, Job
from .serializers import AgentSerializer, JobSerializer

class AgentViewSet(viewsets.ModelViewSet):
    queryset = AgentDetails.objects.all()
    serializer_class = AgentSerializer
    
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        job = serializer.save()

        return Response(self.get_serializer(job).data)