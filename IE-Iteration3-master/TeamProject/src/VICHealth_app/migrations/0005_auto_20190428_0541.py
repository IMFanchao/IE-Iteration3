# Generated by Django 2.2 on 2019-04-28 05:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('VICHealth_app', '0004_auto_20190428_0534'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='club',
            unique_together={('place_id', 'name', 'address', 'postcode', 'state', 'longitude', 'latitude')},
        ),
    ]
