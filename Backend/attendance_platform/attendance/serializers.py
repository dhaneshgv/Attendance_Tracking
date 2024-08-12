# serializers.py

from rest_framework import serializers
from .models import Attendance, SecurityGuard

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class SecurityGuardSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurityGuard
        fields = '__all__'
