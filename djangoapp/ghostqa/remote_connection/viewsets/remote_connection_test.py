from rest_framework import viewsets
from rest_framework.response import Response

from rest_framework.decorators import action

class RemoteConnectionViewSet(viewsets.ViewSet):
    
    def list(self, request):
        return Response({"message": "Continue with the execute actions"})
    
    
    @action(detail=False, methods=['get'])
    def connection_check(self, request):
        # checking the remote connection here.
        return Response({"message": "Api connected successfully!"})
