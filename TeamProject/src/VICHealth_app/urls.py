from django.urls import path
from . import views

app_name = 'VICHealth_app'

urlpatterns = [
    path('check_activity_level/', views.check_activity_level, name = 'check_activity_level'),
    path('health_tips/', views.health_tips, name = 'health_tips'),
    path('sub_info/', views.sub_info, name = 'sub_info'),
    path('data/',views.data, name = 'data'),
    path('diet/',views.diet, name = 'diet'),
    path('about_us/',views.about_us, name = 'about_us'),
    path('', views.index, name = 'index')
]
