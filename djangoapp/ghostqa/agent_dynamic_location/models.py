from django.db import models
import uuid
from cypress.models import TestSuite
from performace_test.models import PerformaceTestSuite
# from knox.models import AuthToken, AuthTokenManager
from django.contrib.auth.models import User
from django.utils import timezone


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
    location = models.ForeignKey(PrivateLocation, on_delete=models.CASCADE, blank=True, null=True, related_name='location')
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
    
 
class LoadDistribution(models.Model):
    private_location = models.ForeignKey(PrivateLocation, on_delete=models.CASCADE, related_name='private_location')
    percentage_of_traffic = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    number_of_users = models.IntegerField(blank=True, null=True)
    ref = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.private_location} {self.percentage_of_traffic}'

class AgentDetails(models.Model): # INFO this model is no longer used.
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
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='agent')
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
    # def save(self, *args, **kwargs):
    #     if self.agent.agent_status == 'available':
    #         self.agent.agent_status = 'Occupied'
    #         self.agent.save()
    #     super(Job, self).save(*args, **kwargs) 

    # def __str__(self):
    #     return f"Job {self.job_id}"
    
    
    def save(self, *args, **kwargs):
        if self.pk:
            orig_job = Job.objects.get(pk=self.pk)
            if orig_job.job_status == 'completed':
                self.agent.agent_status = 'available'
                self.agent.save()
            elif orig_job.job_status == 'queued':
                self.agent.agent_status = 'occupied'
                self.agent.save()
        super(Job, self).save(*args, **kwargs)



class CustomToken(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='custom_tokens')
    token = models.CharField(max_length=255)
    expiry = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    @classmethod
    def validate_token(cls, token):
        try:
            custom_token = cls.objects.get(token=token)
            if custom_token.is_expired():
                return None
            return custom_token.agent
        except cls.DoesNotExist:
            return None

    def save(self, *args, **kwargs):
        # Generate a random token if not provided
        if not self.token:
            self.token = self.generate_token()
        super(CustomToken, self).save(*args, **kwargs)
        
    def generate_token(self):
        # Generate a random token of length 40
        import secrets
        import string
        import uuid
        
        token = str(uuid.uuid4())
        # token = '-'.join([token[:8], token[8:12], token[12:16], token[16:20], token[20:]])
        
        return token
        # alphabet = string.ascii_letters + string.digits
        # return ''.join(secrets.choice(alphabet) for _ in range(40))

    def is_expired(self):
        return timezone.now() > self.expiry

    def __str__(self):
        return self.token 
        