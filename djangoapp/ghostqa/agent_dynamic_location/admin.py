from django.contrib import admin

# Register your models here.
from .models import AgentDetails, Job

admin.site.register(AgentDetails)
admin.site.register(Job)