# Generated by Django 2.0.2 on 2018-09-18 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0019_auto_20180911_2103'),
    ]

    operations = [
        migrations.AddField(
            model_name='pool',
            name='psc',
            field=models.ManyToManyField(to='categories.PSC'),
        ),
    ]
