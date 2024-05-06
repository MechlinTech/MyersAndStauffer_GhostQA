from django.contrib import admin

# Register your models here.
from .models import PerformaceTestSuite, TestContainersRuns, JmeterTestContainersRuns

admin.site.register(PerformaceTestSuite)
admin.site.register(TestContainersRuns)
admin.site.register(JmeterTestContainersRuns)