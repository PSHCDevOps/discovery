# Generated by Django 2.0.2 on 2018-03-25 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('discovery', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cachepage',
            name='count',
            field=models.BigIntegerField(default=0, null=True),
        ),
    ]