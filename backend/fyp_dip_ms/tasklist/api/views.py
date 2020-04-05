from rest_framework.generics import ListAPIView
from rest_framework import viewsets

from tasklist.models import Task, Comment, Project, Semester, TaskAttachDocument, Project, AuthUser

from .serializers import (
	taskSerializer, 
	commentSerializer, 
	projectSerializer, 
	taskSerializerNoId, 
	semesterSerializer, 
	documentSerializer, 
	userAndProjectsSerializer
)

from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class taskViewSet(viewsets.ModelViewSet):
	serializer_class = taskSerializer
	def get_queryset(self):
		queryset = Task.objects.all()

		project_id = self.request.query_params.get('project_id', None)
		if project_id is not None:
			queryset = queryset.filter(project_id__project_id=project_id)
		
		student_id = self.request.query_params.get('student_id', None)
		if student_id is not None:
			queryset = queryset.filter(student_id__id=student_id)

		tutor_id = self.request.query_params.get('tutor_id', None)
		if tutor_id is not None:
			queryset = queryset.filter(tutor_id__id=tutor_id)

		task_type = self.request.query_params.get('task_type', None)
		if task_type is not None:
			queryset = queryset.filter(task_type=task_type)

		status = self.request.query_params.get('status', None)
		if status is not None:
			queryset = queryset.filter(status=status)

		return queryset

class commentViewSet(viewsets.ModelViewSet):
	serializer_class = commentSerializer

	def get_queryset(self):
		queryset = Comment.objects.all()

		task_id = self.request.query_params.get('task_id', None)
		if task_id is not None:
			queryset = queryset.filter(task_id__task_id=task_id)
		
		user_id = self.request.query_params.get('user_id', None)
		if user_id is not None:
			queryset = queryset.filter(user_id__id=user_id)
		
		return queryset

class projectViewSet(viewsets.ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = projectSerializer


class taskCommentViewSet(viewsets.ModelViewSet):
	queryset = Task.objects.all() 
	serializer_class = taskSerializerNoId

class semesterStartViewSet(viewsets.ModelViewSet):
	queryset = Semester.objects.all() 
	serializer_class = semesterSerializer

class documentViewSet(viewsets.ModelViewSet):
	queryset = TaskAttachDocument.objects.all()
	serializer_class = documentSerializer

class usersAndProjects(viewsets.ModelViewSet):
	queryset = AuthUser.objects.all()
	serializer_class = userAndProjectsSerializer