from django.db import models

# Create your models here.
class Club(models.Model):
    place_id = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100,blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    suburb =models.CharField(max_length=20,blank=True, null=True)
    state = models.CharField(max_length=3, blank=True, null=True)
    postcode = models.CharField(max_length=4, blank=True, null=True)
    type = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return str(self.place_id)
