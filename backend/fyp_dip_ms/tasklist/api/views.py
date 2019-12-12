from rest_framework.generics import ListAPIView

from tasklist.models import Task, Comment, Project
from .serializers import taskSerializer, commentSerializer, projectSerializer

class taskListView(ListAPIView):
	queryset = Task.objects.all()
	serializer_class = taskSerializer

class commentListView(ListAPIView):
	queryset = Comment.objects.all()
	serializer_class = commentSerializer

class projectListView(ListAPIView):
	queryset = Project.objects.all()
	serializer_class = projectSerializer