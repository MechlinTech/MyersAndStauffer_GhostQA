from django.db import models
import uuid
from cypress.models import TestSuite
from performace_test.models import PerformaceTestSuite

# Create your models here.


class PrivateLocation(models.Model):
    TYPE_FUNCTIONALITIES = [
        ('performance', 'Performance')
    ]
    TYPE_LOCATION = [
        ('unshared', 'Unshared')
    ]
    ref = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    location_name = models.CharField(max_length=100, unique=True, blank=True, null=True)
    parallel_engine_runs = models.IntegerField(default=1, blank=True, null=True)
    functionality = models.CharField(max_length=20, choices=TYPE_FUNCTIONALITIES, default='performance')
    location_type = models.CharField(max_length=20, choices=TYPE_LOCATION, default='unshared')
    max_threads_per_engine = models.IntegerField(default=50, blank=True, null=True)
    console_xms_mb = models.IntegerField(default=1024, blank=True, null=True)
    console_xmx_mb = models.IntegerField(default=4096, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f'{self.ref} {self.location_name}'
    

class Agent(models.Model):
    ref = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100, unique=True, blank=True, null=True)
    agent_address = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')], default='inactive')
    agent_status = models.CharField(max_length=20, choices=[('available', 'Available'), ('Occupied', 'Occupied')], default='available')
    description = models.TextField(max_length=250, blank=True, null=True)
    last_heartbeat = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.name}'
    
    

class AgentDetails(models.Model):
    name = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    port = models.IntegerField()
    max_concurrent_jobs = models.IntegerField()
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')], default='inactive')
    agent_status = models.CharField(max_length=20, choices=[('available', 'Available'), ('Occupied', 'Occupied')], default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}, {self.status}'
    


class Job(models.Model):
    field_type_choices = [
        ('jmeter', 'JMX'),
        ('testlab', 'Cypress')
    ]
    job_status_choices = [
        ('queued', 'Queued'),
        ('pending', 'Pending'),
        ('completed', 'Completed')
    ]
    agent = models.ForeignKey(AgentDetails, on_delete=models.CASCADE, related_name='agent_details')
    performance_test_suite = models.ForeignKey(PerformaceTestSuite, on_delete=models.CASCADE, blank=True, null=True)
    test_suite = models.ForeignKey(TestSuite, on_delete=models.CASCADE, blank=True, null=True)
    job_id = models.CharField(max_length=36, unique=True, default=uuid.uuid4, editable=False)
    # job_id = models.CharField(max_length=36, unique=True, default=uuid.uuid4, editable=False)
    field_type = models.CharField(max_length=20, choices=field_type_choices)
    # file = models.FileField(upload_to='uploads/performace_testing/', blank=True, null=True)
    # request_json = models.JSONField(null=True, blank=True)
    job_status = models.CharField(max_length=10, choices=job_status_choices, default='queued', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Add other fields as needed
    def save(self, *args, **kwargs):
        if self.agent.agent_status == 'available':
            self.agent.agent_status = 'Occupied'
            self.agent.save()
        super(Job, self).save(*args, **kwargs) 

    def __str__(self):
        return f"Job {self.job_id}"