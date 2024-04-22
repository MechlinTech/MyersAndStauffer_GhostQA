from rest_framework import serializers
# from .models import Agent
from .models import AgentDetails, Job

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentDetails
        fields = ['id', 'name', 'ip_address', 'port', 'max_concurrent_jobs', 'status', 'agent_status', 'created_at', 'updated_at']
        



class JobSerializer(serializers.ModelSerializer):
    # agent = serializers.PrimaryKeyRelatedField(queryset=AgentDetails.objects.all())
    # agent = AgentSerializer(read_only=True)
    agent_details = AgentSerializer(source='agent', read_only=True)
    class Meta:
        model = Job
        fields = ['id', 'agent', 'job_id', 'field_type', 'file', 'request_json', 'job_status', 'created_at', 'updated_at', 'agent_details']
