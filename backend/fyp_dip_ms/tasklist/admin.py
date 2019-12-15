from django.contrib import admin

# Register your models here.

from .models import Task, Comment, Project

class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ('task_type', 'due_date', 'student', 'status')
    list_filter = ('task_type', 'task_due_date', 'student_id', 'status')

admin.site.register(Task, TaskAdmin)
admin.site.register(Comment)
admin.site.register(Project)

