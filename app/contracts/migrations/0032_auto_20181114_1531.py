# Generated by Django 2.0.9 on 2018-11-14 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contracts', '0031_auto_20181109_1930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agency',
            name='name',
            field=models.CharField(db_index=True, max_length=128),
        ),
        migrations.AlterField(
            model_name='contract',
            name='NAICS',
            field=models.CharField(db_index=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='PSC',
            field=models.CharField(db_index=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='completion_date',
            field=models.DateTimeField(db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='date_signed',
            field=models.DateTimeField(db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='obligated_amount',
            field=models.DecimalField(db_index=True, decimal_places=2, max_digits=128, null=True),
        ),
        migrations.AlterField(
            model_name='contract',
            name='vendor_phone',
            field=models.CharField(db_index=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='contractstatus',
            name='name',
            field=models.CharField(db_index=True, max_length=128),
        ),
        migrations.AlterField(
            model_name='fpdsload',
            name='load_date',
            field=models.DateField(db_index=True),
        ),
        migrations.AlterField(
            model_name='placeofperformance',
            name='country_code',
            field=models.CharField(db_index=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='placeofperformance',
            name='country_name',
            field=models.CharField(db_index=True, max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='placeofperformance',
            name='state',
            field=models.CharField(db_index=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='placeofperformance',
            name='zipcode',
            field=models.CharField(db_index=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='pricingstructure',
            name='name',
            field=models.CharField(db_index=True, max_length=128),
        ),
    ]
