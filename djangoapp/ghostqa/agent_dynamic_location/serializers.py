from rest_framework import serializers
# from .models import Agent
from .models import AgentDetails, Job, PrivateLocation, Agent, LoadDistribution, CustomToken
from cypress.serializers.request import TestSuiteSerializer
from cypress.models import TestSuite, TestContainersRuns as CypressContainersRun
from performace_test.serializers.performace_tests import PerformaceTestSuiteSerializer, TestContainersRunsSerializer
from performace_test.models import JmeterTestContainersRuns, PerformaceTestSuite, TestContainersRuns
from django.utils import timezone





class AgentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'

class PrivateLocationSerializer(serializers.ModelSerializer):
    agents = serializers.SerializerMethodField()
    class Meta:
        model = PrivateLocation
        fields = [
            'id',
            'ref',
            'location_name',
            'parallel_engine_runs',
            'functionality',
            'location_type',
            'max_threads_per_engine',
            'console_xms_mb',
            'console_xmx_mb',
            'created_at',
            'updated_at',
            'agents'
        ]
        
    def get_agents(self, obj):
        agents = Agent.objects.filter(location=obj)
        return AgentListSerializer(agents, many=True).data
        
class NewAgentSerializer(serializers.ModelSerializer):
    # location = serializers.PrimaryKeyRelatedField(queryset=PrivateLocation.objects.all())
    docker_command = serializers.SerializerMethodField()
    class Meta:
        model = Agent
        fields = [
            'id',
            'location',
            'ref',
            'name',
            'agent_address',
            'status',
            'description',
            'last_heartbeat',
            'agent_status',
            'created_at',
            'updated_at',
            'docker_command',
        ]
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['location'] = PrivateLocationSerializer(instance.location).data
        # response['docker_command'] = 'docker run -d --name my-django-app -e DJANGO_DEBUG=True --net=host ghostqa/agent:latest python Agent/main.py' 
        return response
    
    def create(self, validated_data):
        # Generate the token
        expiry_date = timezone.now() + timezone.timedelta(hours=1)
        # token = str(uuid.uuid4())

        # Create the Agent instance
        agent = Agent.objects.create(**validated_data)

        # Create the CustomToken instance
        custom_token = CustomToken.objects.create(agent=agent, expiry=expiry_date)

        # Set the token attribute on the agent instance
        # setattr(agent, '_token', token)

        return agent
    
    def get_docker_command(self, instance):
        try:
            token = CustomToken.objects.get(agent=instance).token
        except CustomToken.DoesNotExist:
            token = None
        agent_id = f"{instance.ref}" if instance.ref else None
        token_param = f"{token}" if token else None
        return f"docker run -d --name GhostQA-Codeengine -e DJANGO_DEBUG=True --net=host ghostqa/agent:latest python Agent/main.py {agent_id} {token_param}"
        #TODO need to add the agent_id


class LoadDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoadDistribution
        fields = ['id', 'ref', 'private_location', 'percentage_of_traffic', 'number_of_users', 'created_at', 'updated_at']



class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentDetails
        fields = ['id', 'name', 'ip_address', 'port', 'max_concurrent_jobs', 'status', 'agent_status', 'created_at', 'updated_at']
        

from django.forms.models import model_to_dict
from cypress.build_cypress import generate_test_cases


class JmeterTestContainersRunsSerializer(serializers.ModelSerializer):
    suite = serializers.PrimaryKeyRelatedField(queryset=PerformaceTestSuite.objects.all(), required=False)
    class Meta:
        model = JmeterTestContainersRuns
        fields = '__all__'
        lookup_field = 'ref'

class JmeterTestContainersRunsSerializerNew(serializers.ModelSerializer):
    suite = serializers.PrimaryKeyRelatedField(queryset=PerformaceTestSuite.objects.all(), required=False)
    class Meta:
        model = TestContainersRuns
        fields = '__all__'
        lookup_field = 'ref'

class TestSuiteSerializer(serializers.ModelSerializer):
    scenarios_file = serializers.FileField(required=False)  
    name = serializers.CharField(max_length=1000)
    client_reference_id = serializers.CharField(required=False)
    # container_runs = TestContainersRunsSerializer(many=True,read_only=True)
    # request_json = RequestTestSuiteSerializer(many=True)
    
    class Meta:
        model = TestSuite
        fields = ["id", "client_reference_id", "name","container_runs","cypress_code","scenarios_file", "request_json"]

class JobSerializer(serializers.ModelSerializer):
    # agent = serializers.PrimaryKeyRelatedField(queryset=AgentDetails.objects.all())
    # agent = AgentSerializer(read_only=True)
    performance_details = PerformaceTestSuiteSerializer(source='performance_test_suite',read_only=True)
    test_suite_details = TestSuiteSerializer(source='test_suite',read_only=True)
    agent_details = NewAgentSerializer(source='agent', read_only=True)
    container_run = serializers.SerializerMethodField()
    cypress_container_run = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = ['id', 'agent', 'job_id', 'field_type', 
                  'job_status', 'created_at', 'updated_at', 
                  'agent_details', 'performance_test_suite', 
                  'performance_details','test_suite','test_suite_details',
                  'container_run', 'cypress_container_run'
                  ]
    
    def get_container_run(self, obj):
        container_runs = TestContainersRuns.objects.filter(suite=obj.performance_test_suite)
        if container_runs.exists():
            # Assuming you need to handle multiple container runs
            return [
                {
                    'container_id': run.container_id,
                    'container_status': run.container_status,
                    'container_name': run.container_name,
                    'container_short_id': run.container_short_id,
                    'container_logs_str': run.container_logs_str,
                    'ref': run.ref,
                    'json': run.json,
                    'raw_data': run.raw_data,
                    'client_reference_id': run.client_reference_id
                } for run in container_runs
            ]
        return None
        
    def get_cypress_container_run(self, obj):
        container_runs = CypressContainersRun.objects.filter(suite=obj.test_suite)
        if container_runs.exists():
            # Assuming you need to handle multiple cypress container runs
            return [
                {
                    'id': run.id,
                    'container_id': run.container_id,
                    'container_status': run.container_status,
                    'container_name': run.container_name,
                    'container_short_id': run.container_short_id,
                    'container_logs_str': run.container_logs_str,
                    'ref': run.ref,
                    'json': run.json,
                    'container_label': run.container_labels
                } for run in container_runs
            ]
        return None
    # def get_container_run(self, obj):
    #     try:
    #         container_run = TestContainersRuns.objects.get(suite=obj.performance_test_suite)
    #         return {
    #             'container_id': container_run.container_id,
    #             'container_status': container_run.container_status,
    #             'container_name': container_run.container_name,
    #             'container_short_id': container_run.container_short_id,
    #             'container_logs_str': container_run.container_logs_str,
    #             'ref': container_run.ref,
    #             'json': container_run.json,
    #             'raw_data': container_run.raw_data,
    #             'client_reference_id': container_run.client_reference_id
    #         }
    #     except TestContainersRuns.DoesNotExist:
    #         return None
        
    # def get_cypress_container_run(self, obj):
    #     try:
    #         container_run = CypressContainersRun.objects.get(suite=obj.test_suite)
    #         return {
    #             'id': container_run.id,
    #             'container_id': container_run.container_id,
    #             'container_status': container_run.container_status,
    #             'container_name': container_run.container_name,
    #             'container_short_id': container_run.container_short_id,
    #             'container_logs_str': container_run.container_logs_str,
    #             'ref': container_run.ref,
    #             'json': container_run.json,
    #             'container_label': container_run.container_labels
    #         }
    #     except CypressContainersRun.DoesNotExist:
    #         return None     
    # def create(self, validated_data):
    #     field_type = validated_data.pop('field_type')
    #     performance_test_suite_data = validated_data.pop('performance_test_suite', None)
    #     test_suite_data = validated_data.pop('test_suite', None)

    #     if field_type == 'jmeter' and performance_test_suite_data:
    #         container_run = TestContainersRuns.objects.create(
    #         suite = performance_test_suite_data,
    #         container_status= f"pending"
    #         )
    #         container_run.container_name =  f"{performance_test_suite_data.name}-{container_run.ref}"
    #         container_run.client_reference_id = performance_test_suite_data.client_reference_id
    #         container_run.save()
    #         job = Job.objects.create(performance_test_suite=performance_test_suite_data, **validated_data)
    #     elif field_type == 'testlab':
    #         test_suite = TestSuite.objects.get(pk=test_suite_data.pk)
    #         container_run = CypressContainersRun.objects.create(
    #             suite = test_suite,
    #             container_status = f'pending'
    #         )
    #         container_run.container_name = f"{test_suite_data.name}-{container_run.ref}"
    #         container_run.save()
    #         job = Job.objects.create(test_suite=test_suite, **validated_data)
    #     return job
