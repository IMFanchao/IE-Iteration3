from django.contrib import admin

from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Club

# Register your models here.
class ClubResource(resources.ModelResource):

    class Meta:
        model = Club

class ClubAdmin(ImportExportModelAdmin):
    resource_class = ClubResource

admin.site.register(Club,ClubAdmin)
