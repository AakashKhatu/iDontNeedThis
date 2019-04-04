from django.urls import path

from . import views

urlpatterns = [
    path('', views.index.as_view(), name='index'),
    path('dashboard/', views.dash.as_view(), name='dashboard'),
]
