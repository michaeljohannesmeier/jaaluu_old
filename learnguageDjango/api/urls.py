from django.conf.urls import include
from django.urls import path
from . import views

urlpatterns = {
    path('texts/<str:category>/', views.texts, name='texts'),
    path('text/', views.text, name='text'),
    path('translate/', views.translate, name='translate'),
    path('saveword/', views.saveword, name="saveword"),
    path('adminwords', views.adminwords, name="adminwords")


}

