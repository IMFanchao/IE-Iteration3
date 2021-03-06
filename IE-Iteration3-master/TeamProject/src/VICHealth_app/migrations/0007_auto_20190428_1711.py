# Generated by Django 2.2 on 2019-04-28 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VICHealth_app', '0006_auto_20190428_0606'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='postcode',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
        migrations.AlterField(
            model_name='club',
            name='state',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
