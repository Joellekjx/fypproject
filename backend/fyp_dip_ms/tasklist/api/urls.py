from rest_framework.routers import DefaultRouter

from .views import taskViewSet, commentViewSet, projectViewSet, taskCommentViewSet

router = DefaultRouter()
router.register(r'task', taskViewSet, basename='task')
router.register(r'comment', commentViewSet, basename='comment')
router.register(r'project', projectViewSet, basename='project')
router.register(r'taskComment', taskCommentViewSet, basename='taskComment')
urlpatterns = router.urls

# from django.urls import path

# urlpatterns = [
# 	path('task/', taskListView.as_view()),
# 	path('comment/', commentListView.as_view()),
# 	path('project/', projectListView.as_view()),
# ]