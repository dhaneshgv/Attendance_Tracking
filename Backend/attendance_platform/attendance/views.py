# attendance/views.py

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from .models import Attendance, SecurityGuard
from .serializers import AttendanceSerializer, SecurityGuardSerializer

class UploadSelfieView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Save file to media directory
        file_path = default_storage.save(f'selfies/{file.name}', file)
        return Response({"message": "Selfie uploaded successfully", "file_path": file_path})

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class SecurityGuardViewSet(viewsets.ModelViewSet):
    queryset = SecurityGuard.objects.all()
    serializer_class = SecurityGuardSerializer


