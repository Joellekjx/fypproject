# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)

# Extending AuthUser 
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#abstractuser
class AuthUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    project_id = models.ForeignKey('Project', models.DO_NOTHING, db_column='project_Id')

    class Meta:
        managed = False
        db_table = 'auth_user'

    def __str__(self):
        return self.first_name + self.last_name


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Comment(models.Model):
    comment_id = models.AutoField(db_column='comment_Id', primary_key=True)  # Field name made lowercase.
    task_id = models.ForeignKey('Task', models.DO_NOTHING, db_column='task_Id')  # Field name made lowercase.
    user_id = models.ForeignKey(AuthUser, models.DO_NOTHING, related_name='user_id', db_column='user_Id')  # Field name made lowercase.
    content = models.CharField(max_length=3000, blank=True, null=True)
    creation_date = models.DateTimeField(db_column='creation_Date')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'comment'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Project(models.Model):
    project_id = models.AutoField(db_column='project_Id', primary_key=True)  # Field name made lowercase.
    tutor_id = models.ForeignKey('AuthUser', models.DO_NOTHING, db_column='tutor_Id')
    project_name = models.CharField(db_column='project_Name', max_length=100)  # Field name made lowercase.
    project_description = models.CharField(db_column='project_Description', max_length=3000, blank=True, null=True)  # Field name made lowercase.
    is_FYP_Project = models.IntegerField(db_column='is_FYP_Project')

    class Meta:
        managed = False
        db_table = 'project'
    
    def __str__(self):
        return self.project_name

class Semester(models.Model):
    semester_id = models.AutoField(db_column='semester_Id', primary_key=True)
    semester_type_choices = (
        ('Semester 1','Semester 1'),
        ('Semester 2','Semester 2')
    )
    semester = models.CharField(db_column='semester', max_length=17, choices=semester_type_choices)
    start_date = models.DateTimeField(db_column='start_Date')

    class Meta:
        managed = False
        db_table = 'semester_start_date'

    def __str__(self):
        return self.semester

class Task(models.Model):
    task_id = models.AutoField(db_column='task_Id', primary_key=True)  # Field name made lowercase.
    project_id = models.ForeignKey(Project, models.DO_NOTHING, db_column='project_Id')  # Field name made lowercase.
    student_id = models.ForeignKey(AuthUser, models.DO_NOTHING, related_name='student_id', db_column='student_Id')  # Field name made lowercase.
    tutor_id = models.ForeignKey(AuthUser, models.DO_NOTHING, related_name='tutor_id', db_column='tutor_Id')  # Field name made lowercase.
    
    task_type_choices = (
        ('Weekly Report','Weekly Report'),
        ('Meeting Notes','Meeting Notes'),
        ('FYP Plan Strategy','FYP Plan Strategy'),
        ('Interim Report','Interim Report'),
        ('Final Report','Final Report')
    )

    task_type = models.CharField(db_column='task_Type', max_length=17, choices=task_type_choices)  # Field name made lowercase.
    task_created_date = models.DateTimeField(db_column='task_Created_Date')  # Field name made lowercase.
    task_due_date = models.DateTimeField(db_column='task_Due_Date')  # Field name made lowercase.
    submission_date = models.DateTimeField(db_column='submission_Date', blank=True, null=True)  # Field name made lowercase.
    content = models.CharField(db_column='content', max_length=3000, blank=True, null=True)
    hours_spent = models.IntegerField(db_column='hours_Spent', blank=True, null=True)  # Field name made lowercase.
    
    status_choices = (
        ('Pending','Pending'),
        ('Completed','Completed'),
        ('Late','Late'),
        ('Late Submission','Late Submission')
    )
    
    status = models.CharField(db_column='status', max_length=15, choices=status_choices, default='Pending')
    ordering = ('task_due_date', 'task_type', 'student_id')
    desc = models.CharField(db_column='desc', max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'task'

    def __str__(self):
        return str(self.task_due_date.strftime('%d %b %Y')) + ' ' + str(self.student_id) + ' ' + str(self.task_type)

    def due_date(self):
        return str(self.task_due_date.strftime('%d %b %Y'))

    due_date.admin_order_field = 'task_due_date'

    def student(self):
        return self.student_id
        
    student.admin_order_field = 'student_id'

class TaskAttachDocument(models.Model):
    task_attach_document_id = models.AutoField(db_column='task_Attach_Document_Id', primary_key=True)  # Field name made lowercase.
    task_id = models.ForeignKey(Task, models.DO_NOTHING, db_column='task_Id')  # Field name made lowercase.
    attach_document = models.FileField(upload_to='files', db_column='attach_Document', max_length=100)  # Field name made lowercase.
    uploaded_date = models.DateTimeField(db_column='uploaded_Date')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'task_attach_document'

    def __str__(self):
        return str(self.attach_document)
