from rest_framework import viewsets
from rest_framework.response import Response

from rest_framework.decorators import action
from ..remote_docker_connection import check_remote_docker_listing

class RemoteConnectionViewSet(viewsets.ViewSet):
    
    def list(self, request):
        return Response({"message": "Continue with the execute actions"})
    
    
    @action(detail=False, methods=['get'])
    def connection_check(self, request):
        result = check_remote_docker_listing("15.207.97.170", "2375")
        # checking the remote connection here.
        return Response({"message": "Api connected successfully!", "data":result})
