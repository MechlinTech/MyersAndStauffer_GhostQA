from django.db import models
import uuid

# Create your models here.


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
    job_id = models.CharField(max_length=36, unique=True, default=uuid.uuid4, editable=False)
    field_type = models.CharField(max_length=20, choices=field_type_choices, default=None)
    file = models.FileField(upload_to='uploads/performace_testing/', blank=True, null=True)
    request_json = models.JSONField(null=True, blank=True)
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