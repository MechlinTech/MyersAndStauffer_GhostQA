from rest_framework import serializers
# from .models import Agent
from .models import AgentDetails, Job
from cypress.serializers.request import TestSuiteSerializer
from cypress.models import TestSuite
from performace_test.serializers.performace_tests import PerformaceTestSuiteSerializer

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentDetails
        fields = ['id', 'name', 'ip_address', 'port', 'max_concurrent_jobs', 'status', 'agent_status', 'created_at', 'updated_at']
        

from django.forms.models import model_to_dict
from cypress.build_cypress import generate_test_cases


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
    agent_details = AgentSerializer(source='agent', read_only=True)
    class Meta:
        model = Job
        fields = ['id', 'agent', 'job_id', 'field_type', 'job_status', 'created_at', 'updated_at', 'agent_details', 'performance_test_suite', 'performance_details','test_suite','test_suite_details']
        
    def create(self, validated_data):
        field_type = validated_data.pop('field_type')
        performance_test_suite_data = validated_data.pop('performance_test_suite', None)
        test_suite_data = validated_data.pop('test_suite', None)

        if field_type == 'jmeter' and performance_test_suite_data:
            # performance_test_suite_dict = {
            #     'test_file': performance_test_suite_data.test_file,
            #     'name': performance_test_suite_data.name,
            #     'client_reference_id': performance_test_suite_data.client_reference_id,
            #     'type': performance_test_suite_data.type,
            #     'jthreads_total_user': performance_test_suite_data.jthreads_total_user,
            #     'jrampup_time': performance_test_suite_data.jrampup_time,
            #     'jrampup_steps': performance_test_suite_data.jrampup_steps,
            #     'durations': performance_test_suite_data.durations
            # }
            # performance_test_suite_serializer = PerformaceTestSuiteSerializer(data=performance_test_suite_dict)
            # performance_test_suite_serializer.is_valid(raise_exception=True)
            # performance_test_suite = performance_test_suite_serializer.save()

            job = Job.objects.create(performance_test_suite=performance_test_suite_data, **validated_data)
        elif field_type == 'testlab':
            test_suite = TestSuite.objects.get(pk=test_suite_data.pk)
            job = Job.objects.create(test_suite=test_suite, **validated_data)
            
            
            
            
        # elif field_type == 'testlab':
        #     # test_suite_data = validated_data.pop('test_suite', None)
        #     job = Job.objects.create(**validated_data)
        #     test_suite_data_dict = model_to_dict(test_suite_data)
        #     if test_suite_data_dict:
        #         # Convert beforeEach and testCases lists into dictionaries
        #         for suite in test_suite_data_dict.get('request_json',[]):
        #             suite['beforeEach'] = {item['type']: item['selector'] for item in suite.get('beforeEach', [])}
        #             suite['testCases'] = {item['name']: item['actions'] for item in suite.get('testCases', [])}
                
        #         test_suite_serializer = TestSuiteSerializer(data=test_suite_data_dict)
        #         test_suite_serializer.is_valid(raise_exception=True)
        #         test_suite = test_suite_serializer.save()
        #         job.test_suite = test_suite
        #         job.save()
        #     else:
        #         raise serializers.ValidationError("TestSuite data is required for 'testlab' field type.")
        # else:
        #     raise serializers.ValidationError("Invalid field_type provided.")
        # elif field_type == 'testlab':
        #     # test_suite_data = validated_data.pop('test_suite', None)
        #     job = Job.objects.create(**validated_data)
        #     test_suite_data_dict = model_to_dict(test_suite_data)
        #     test_suite_serializer = TestSuiteSerializer(data=test_suite_data_dict)
        #     if test_suite_data_dict:
        #         # Generate cypress_code
        #         cypress_code = []
        #         for suites in test_suite_data_dict.get('request_json', []):
        #             test_cases = suites.get('testCases', [])
        #             before_each = suites.get('beforeEach', [])
        #             result_cypress_code = """
        #             // Prevent Cypress from failing the test on uncaught errors
        #             Cypress.on('uncaught:exception', (err, runnable) => {
        #             // Log the error (optional)
        #             console.error('Uncaught Exception:', err.message);
                    
        #             // Return false to prevent Cypress from failing the test
        #             return false;
        #             }); \n\n\n""" + f"{generate_test_cases(test_cases, before_each)}"
        #             cypress_code.append(result_cypress_code)

        #         # Add cypress_code to test_suite_data
        #         test_suite_data_dict['cypress_code'] = "\n".join(cypress_code)
        #     # if test_suite_data:
        #         # test_suite_data_dict = model_to_dict(test_suite_data)
        #         # test_suite_serializer = TestSuiteSerializer(data=test_suite_data_dict)
        #         test_suite_serializer.is_valid(raise_exception=True)
        #         test_suite = test_suite_serializer.save()
        #         job.test_suite = test_suite
        #         job.save()
        #     else:
        #         raise serializers.ValidationError("TestSuite data is required for 'testlab' field type.")
        # else:
        #     raise serializers.ValidationError("Invalid field_type provided.")
        # elif field_type == 'testlab':
        #     test_suite_data_dict = model_to_dict(test_suite_data)
        #     if test_suite_data_dict:
        #         # Generate cypress_code
        #         cypress_code = []
        #         for suites in test_suite_data_dict.get('request_json', []):
        #             test_cases = suites.get('testCases', [])
        #             before_each = suites.get('beforeEach', [])
        #             result_cypress_code = """
        #             // Prevent Cypress from failing the test on uncaught errors
        #             Cypress.on('uncaught:exception', (err, runnable) => {
        #             // Log the error (optional)
        #             console.error('Uncaught Exception:', err.message);
                    
        #             // Return false to prevent Cypress from failing the test
        #             return false;
        #             }); \n\n\n""" + f"{generate_test_cases(test_cases, before_each)}"
        #             cypress_code.append(result_cypress_code)

        #         # Add cypress_code to test_suite_data
        #         test_suite_data_dict['cypress_code'] = "\n".join(cypress_code)
                
        #         # test_suite_serializer = TestSuiteSerializer(data=test_suite_data_dict)
        #         # test_suite_serializer.is_valid(raise_exception=True)
        #         # test_suite = test_suite_serializer.save()

        #         # Save job with test_suite_data directly
        #         # job = Job.objects.create(**validated_data)
        #     else:
        #         raise serializers.ValidationError("TestSuite data is required for 'testlab' field type.")
        # else:
        #     # For other field types, at least one related object is required
        #     raise serializers.ValidationError("At least one related object is required for other field types.")
        return job
