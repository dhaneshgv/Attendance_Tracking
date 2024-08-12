# urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from attendance import views

router = DefaultRouter()
router.register(r'securityguards', views.SecurityGuardViewSet)
router.register(r'attendance', views.AttendanceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/upload-selfie/', views.UploadSelfieView.as_view(), name='upload-selfie'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
