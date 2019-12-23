from rest_framework.generics import ListAPIView
from rest_framework import viewsets

from tasklist.models import Task, Comment, Project
from .serializers import taskSerializer, commentSerializer, projectSerializer

from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class taskViewSet(viewsets.ModelViewSet):
	queryset = Task.objects.all()
	serializer_class = taskSerializer

class commentViewSet(viewsets.ModelViewSet):
	queryset = Comment.objects.all()
	serializer_class = commentSerializer

class projectViewSet(viewsets.ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = projectSerializer
	