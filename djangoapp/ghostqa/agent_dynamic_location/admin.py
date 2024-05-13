from django.contrib import admin

# Register your models here.
from .models import Agent, Job, PrivateLocation, LoadDistribution

admin.site.register(Agent)
admin.site.register(Job)
admin.site.register(PrivateLocation)
admin.site.register(LoadDistribution)