from django.urls import path

from . import views

urlpatterns = [
    path('', views.index.as_view(), name='index'),
    path('dashboard/', views.dash.as_view(), name='dashboard'),
    path('profile/', views.profile.as_view(), name='profile'),
    path('logout/', views.logout_view, name='logout'),
    path('about/', views.about_view, name='about'),
    path('faq/', views.faq_view, name='faq'),
]
