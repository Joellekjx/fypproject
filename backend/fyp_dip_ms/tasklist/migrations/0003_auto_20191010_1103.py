# Generated by Django 2.2.6 on 2019-10-10 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasklist', '0002_auto_20191010_1030'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.PositiveSmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('replyid', models.AutoField(db_column='replyId', primary_key=True, serialize=False)),
                ('tasklistid', models.IntegerField(blank=True, db_column='taskListId', null=True)),
                ('userid', models.IntegerField(blank=True, db_column='userId', null=True)),
                ('comments', models.CharField(blank=True, max_length=3000, null=True)),
                ('replydate', models.DateTimeField(blank=True, db_column='replyDate', null=True)),
                ('latestupdatedate', models.DateTimeField(blank=True, db_column='latestUpdateDate', null=True)),
            ],
            options={
                'db_table': 'reply',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Replyattachdocument',
            fields=[
                ('documentid', models.AutoField(db_column='documentId', primary_key=True, serialize=False)),
                ('replyid', models.IntegerField(blank=True, db_column='replyId', null=True)),
                ('uploaderid', models.IntegerField(blank=True, db_column='uploaderId', null=True)),
                ('studentid', models.IntegerField(blank=True, db_column='studentId', null=True)),
                ('attachdocument', models.CharField(blank=True, db_column='attachDocument', max_length=100, null=True)),
                ('uploadeddate', models.DateTimeField(blank=True, db_column='uploadedDate', null=True)),
            ],
            options={
                'db_table': 'replyattachdocument',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Reportlist',
            fields=[
                ('reportlistid', models.AutoField(db_column='reportListId', primary_key=True, serialize=False)),
                ('tasklistid', models.IntegerField(blank=True, db_column='taskListId', null=True)),
                ('submissiondate', models.DateTimeField(blank=True, db_column='submissionDate', null=True)),
                ('latestupdatedate', models.DateTimeField(blank=True, db_column='latestUpdateDate', null=True)),
                ('comments', models.CharField(blank=True, max_length=3000, null=True)),
            ],
            options={
                'db_table': 'reportlist',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Taskattachdocument',
            fields=[
                ('documentid', models.AutoField(db_column='documentId', primary_key=True, serialize=False)),
                ('tasklistid', models.IntegerField(blank=True, db_column='taskListId', null=True)),
                ('uploaderid', models.IntegerField(blank=True, db_column='uploaderId', null=True)),
                ('studentid', models.IntegerField(blank=True, db_column='studentId', null=True)),
                ('attachdocument', models.CharField(blank=True, db_column='attachDocument', max_length=100, null=True)),
                ('uploadeddate', models.DateTimeField(blank=True, db_column='uploadedDate', null=True)),
            ],
            options={
                'db_table': 'taskattachdocument',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TasklistTasklist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tasklistid', models.TextField(db_column='tasklistId')),
            ],
            options={
                'db_table': 'tasklist_tasklist',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Weeklyreportlist',
            fields=[
                ('weeklyreportlistid', models.AutoField(db_column='weeklyReportListId', primary_key=True, serialize=False)),
                ('tasklistid', models.IntegerField(blank=True, db_column='taskListId', null=True)),
                ('submissiondate', models.DateTimeField(blank=True, db_column='submissionDate', null=True)),
                ('latestupdatedate', models.DateTimeField(blank=True, db_column='latestUpdateDate', null=True)),
                ('hoursspent', models.IntegerField(blank=True, db_column='hoursSpent', null=True)),
                ('comments', models.CharField(blank=True, max_length=3000, null=True)),
            ],
            options={
                'db_table': 'weeklyreportlist',
                'managed': False,
            },
        ),
        migrations.AlterModelOptions(
            name='tasklist',
            options={'managed': False},
        ),
    ]
