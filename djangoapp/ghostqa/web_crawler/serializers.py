from rest_framework import serializers


from .models import CrawlRequest, Node
class CrawlRequestSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = CrawlRequest
        fields = ['id','start_url','max_depth','client_reference_id']