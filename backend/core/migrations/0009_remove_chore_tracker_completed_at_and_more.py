# Generated by Django 4.1.2 on 2022-10-19 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_rename_day_chore_tracker_due_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chore_tracker',
            name='completed_at',
        ),
        migrations.AddField(
            model_name='chore_tracker',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]