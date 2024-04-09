from rest_framework import serializers
from ..models import TestContainersRuns



class ContainersRunsSerializers(serializers.Serializer):
    raw_data = serializers.SerializerMethodField()
    
    class Meta:
        model = TestContainersRuns
        fields = "__all__"
    
    def get_raw_data(self,instance):
        if instance.raw_data:
            print(instance.raw_data)
        
        return ""
        