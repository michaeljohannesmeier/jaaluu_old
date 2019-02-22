
from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url, include
from learnguageApp import views

urlpatterns = [
    path('', include('learnguageApp.urls')),
    path('admin/', admin.site.urls),
    url(r'^', include('api.urls')),
    url(r'^(?P<path>.*)/$', views.index)

]
