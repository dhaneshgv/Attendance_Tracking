

# models.py

from django.db import models

class Attendance(models.Model):
    date = models.DateField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.date} - {self.status}"

class SecurityGuard(models.Model):
    name = models.CharField(max_length=100)
    # other fields as needed
