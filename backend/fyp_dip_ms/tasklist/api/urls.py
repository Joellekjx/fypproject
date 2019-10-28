from django.urls import path

from .views import taskListView, commentListView, projectListView

urlpatterns = [
	path('task/', taskListView.as_view()),
	path('comment/', commentListView.as_view()),
	path('project/', projectListView.as_view()),
]