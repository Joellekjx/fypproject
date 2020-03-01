from rest_framework.routers import DefaultRouter

from .views import taskViewSet, commentViewSet, projectViewSet, taskCommentViewSet, semesterStartViewSet, documentViewSet

router = DefaultRouter()
router.register(r'task', taskViewSet, basename='task')
router.register(r'comment', commentViewSet, basename='comment')
router.register(r'project', projectViewSet, basename='project')
router.register(r'taskComment', taskCommentViewSet, basename='taskComment')
router.register(r'semesterStart', semesterStartViewSet, basename='semesterStart')
router.register(r'document', documentViewSet, basename='document')
urlpatterns = router.urls
