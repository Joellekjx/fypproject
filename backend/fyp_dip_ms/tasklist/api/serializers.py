from rest_framework import serializers
from tasklist.models import Task, AuthUser, Projects, Comment

class projectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('projectid', 'projectname', 'projectdescription')

class userDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined') 

class userNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('first_name', 'last_name')

class taskSerializer(serializers.ModelSerializer):
    # projectid = projectSerializer()
    # studentid = userDetailsSerializer()
    # tutorid = userDetailsSerializer()

    class Meta:
        model = Task 
        fields = ('taskid', 'projectid', 'studentid', 'tutorid', 'tasktype', 'taskcreateddate', 'taskduedate', 'submissiondate', 'content', 'hoursspent', 'status')
    
    # def create(self, validated_data):
    #     project_data = validated_data.pop('projectid')  
    #     project = Projects.objects.create(**project_data)

    #     studentid_data = validated_data.pop('studentid')
    #     student = AuthUser.objects.create(**studentid_data)

    #     tutorid_data = validated_data.pop('tutorid')
    #     tutor = AuthUser.objects.create(**tutorid_data)
        
    #     task = Task.objects.create(projectid=project, studentid=student, tutorid=tutor, **validated_data)
    #     # task = task.objects.create(studentid=id, **validated_data)
    #     return task

class commentSerializer(serializers.ModelSerializer):
    userid = userNameSerializer()

    class Meta:
        model = Comment
        fields = ('commentid', 'taskid', 'userid', 'content', 'creationdate')

    def create(self, validated_data):
        userid_data = validated_data.pop('userid')
        user = AuthUser.objects.create(**userid_data)

        comment = Comment.objects.create(userid=user **validated_data)

        return comment