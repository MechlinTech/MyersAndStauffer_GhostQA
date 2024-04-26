from django.contrib import admin

# Register your models here.
from .models import TestSuite, TestContainersRuns as CypressContainersRun

admin.site.register(TestSuite)
admin.site.register(CypressContainersRun)