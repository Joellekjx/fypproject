from rest_framework import serializers
from tasklist.models import Task, AuthUser, Project, Comment

class projectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('project_id', 'project_name', 'project_description')

class userDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined') 

class userNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('first_name', 'last_name')

class taskSerializer(serializers.ModelSerializer):
    project_id = projectSerializer()
    student_id = userDetailsSerializer()
    tutor_id = userDetailsSerializer()

    class Meta:
        model = Task 
        fields = ('task_id', 'project_id', 'student_id', 'tutor_id', 'task_type', 'task_created_date', 'task_due_date', 'submission_date', 'content', 'hours_spent', 'status')
        # read_only_fields = ('projectid',)
        # depth=1
    def create(self, validated_data):
        project_data = validated_data.pop('project_id')  
        project = Projects.objects.create(**project_data)

        studentid_data = validated_data.pop('student_id')
        student = AuthUser.objects.create(**studentid_data)

        tutorid_data = validated_data.pop('tutor_id')
        tutor = AuthUser.objects.create(**tutorid_data)
        
        task = Task.objects.create(projectid=project, studentid=student, tutorid=tutor, **validated_data)
        # task = task.objects.create(studentid=id, **validated_data)
        return task

class commentSerializer(serializers.ModelSerializer):
    user_id = userNameSerializer()

    class Meta:
        model = Comment
        fields = ('comment_id', 'task_id', 'user_id', 'content', 'creation_date')

    def create(self, validated_data):
        userid_data = validated_data.pop('user_id')
        user = AuthUser.objects.create(**userid_data)

        comment = Comment.objects.create(userid=user **validated_data)

        return comment