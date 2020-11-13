# Generated by Django 2.2.13 on 2020-09-22 18:05

from django.db import migrations


def remove_pss(apps, scheme_editor):

    model = apps.get_model('categories', 'pool_naics')
    model.objects.filter(pool_id = 'PSS').delete()    

    model = apps.get_model('categories', 'pool_psc')
    model.objects.filter(pool_id = 'PSS').delete()    

    model = apps.get_model('categories', 'pool_keywords')
    model.objects.filter(pool_id = 'PSS').delete()

    model = apps.get_model('categories', 'pool')
    model.objects.filter(id='PSS').delete()

    model = apps.get_model('categories', 'vehicle')
    model.objects.filter(id='PSS').delete()
    

class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0025_auto_20181114_1513'),
        ('vendors', '0041_auto_20200923_1539')
    ]

    operations = [
    	migrations.RunPython(remove_pss)
    ]

