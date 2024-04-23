import os

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import FileUploadSerializer

from django.urls import reverse

class FileUploadDownloadViewSet(viewsets.ViewSet):
    # serializer = FileUploadSerializer
    
    def list(self, request):
        return Response({'message': 'Api is loaded!'})
    @action(detail=False, methods=['post'])
    def upload_file(self, request):
        
        if 'X-Token' not in request.headers:
            return Response({"error": "Token is required."}, status=status.HTTP_401_UNAUTHORIZED)
    
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            path = "/app/uploads" #"D:/Office_Internal_Project/Agent/folder" D:\Office_Internal_Project\Agent\app\uploads
            file = serializer.validated_data['file']
            # Define the path to save the uploaded file
            upload_path = os.path.join(path, file.name)
            # Save the file to the specified path
            with open(upload_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            
            # Get the file URL
            # file_url = request.build_absolute_uri(reverse('file-download')) + f'?path={upload_path}'
            
            return Response({
                "message": "File uploaded successfully.",
                "name": file.name
                # "url": file_url
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['get'])
    def download_file(self, request):
        if 'X-Token' not in request.query_params:
            return Response({"error": "Token is required."}, status=status.HTTP_401_UNAUTHORIZED)
        
        # destination_path = 'D:/Office_Internal_Project/Agent/download_folder'
        file_path = request.query_params.get('path')
        if not file_path:
            return Response({"error": "File path is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        file_name = os.path.basename(file_path)
        if os.path.exists(file_path):
            if 'destination_path' in request.query_params:
                destination_path = request.query_params['destination_path']
            else:
                destination_path = os.getcwd()
            with open(file_path, 'rb') as file:
                # Save the file to the destination path
                destination_file_path = os.path.join(destination_path, file_name)
                with open(destination_file_path, 'wb') as destination_file:
                    destination_file.write(file.read())
                
                # Prepare the response
                response = Response({"message": "File downloaded successfully.","file_location": destination_file_path})
                return response
        return Response({"error": "File not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        # destination_path = 'D:/Office_Internal_Project/Agent/download_folder'
        # file_path = request.query_params.get('path')
        # if not file_path:
        #     return Response({"error": "File path is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # file_name = os.path.basename(file_path)
        # if os.path.exists(file_path):
        #     with open(file_path, 'rb') as file:
        #         response = Response(file.read(), content_type='application/octet-stream')
        #         response['Content-Disposition'] = f'attachment; filename="{file_name}"'
        #         return response
        # return Response({"error": "File not found."}, status=status.HTTP_404_NOT_FOUND)
# def upload_file(self, request):
        
    #     if 'X-Token' not in request.headers:
    #         return Response({"error": "Token is required."}, status=status.HTTP_401_UNAUTHORIZED)
        
    #     serializer = FileUploadSerializer(data=request.data)
    #     if serializer.is_valid():
    #         path = "D:/Office_Internal_Project/Agent/folder"
    #         file = serializer.validated_data['file']
    #         # Define the path to save the uploaded file
    #         upload_path = os.path.join(path, file.name)
    #         # Save the file to the specified path
    #         with open(upload_path, 'wb+') as destination:
    #             for chunk in file.chunks():
    #                 destination.write(chunk)
            
    #         file_url = request.build_absolute_uri(reverse('file-download')) + f'?path={upload_path}
            
    #         return Response({"message": "File uploaded successfully.",
    #         "name": file.name,
    #         "url": file_url}, 
    #         status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)