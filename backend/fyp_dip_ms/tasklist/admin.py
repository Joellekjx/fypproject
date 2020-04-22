from django.contrib import admin

# Register your models here.

from .models import Task, Comment, Project, Semester, TaskAttachDocument, AuthUser


from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

# from .models import User

# https://kite.com/blog/python/custom-django-user-model/
class AddUserForm(forms.ModelForm):
    """
    New User Form. Requires password confirmation.
    """
    password1 = forms.CharField(
        label='Password', widget=forms.PasswordInput
    )
    password2 = forms.CharField(
        label='Confirm password', widget=forms.PasswordInput
    )

    class Meta:
        model = AuthUser
        fields = (
            'password', 'is_superuser', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'email', 'project_id'
        )

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UpdateUserForm(forms.ModelForm):
    """
    Update User Form. Doesn't allow changing password in the Admin.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = AuthUser
        fields = (
            'password', 'is_superuser', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'email', 'project_id'
        )

    def clean_password(self):
# Password can't be changed in the admin
        return self.initial["password"]


class UserAdmin(BaseUserAdmin):
    form = UpdateUserForm
    add_form = AddUserForm

    list_display = ('username', 'first_name', 'last_name', 'is_staff')
    list_filter = ('is_staff', )
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'username', 'password1', 'password2', 
                    'first_name', 'last_name', 
                    'is_superuser', 'is_staff',  'is_active',
                    'project_id', 'date_joined'
                )
            }
        ),
    )
    search_fields = ('username', 'first_name', 'last_name')
    ordering = ('username', 'first_name', 'last_name')
    filter_horizontal = ()


admin.site.register(AuthUser, UserAdmin)

class TaskAdmin(admin.ModelAdmin):
    model = Task
    # list_display = ('task_type', 'student_id', 'task_due_date', 'status')
    list_display = ('task_type', 'due_date', 'student', 'status', 'project_id')
    list_select_related = ('student_id', 'project_id')
    list_filter = ('task_type', 'task_due_date', 'student_id', 'status', 'project_id')

class SemesterAdmin(admin.ModelAdmin):
    model = Semester
    list_display = ('semester', 'start_date')
    list_filter = ('semester', 'start_date')

# admin.site.register(AuthUser)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment)
admin.site.register(Project)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(TaskAttachDocument)