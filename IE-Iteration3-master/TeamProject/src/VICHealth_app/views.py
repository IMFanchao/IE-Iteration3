from django.shortcuts import render, render_to_response, get_object_or_404, redirect
from .models import Club
from .forms import InputForm

# Create your views here.
def base(request):
    return render(request, 'VICHealth_app/base.html')

def index(request):
    return render(request, 'VICHealth_app/index.html')

def check_activity_level(request):
    return render(request, 'VICHealth_app/check_activity_level.html')

def health_tips(request):
    return render(request, 'VICHealth_app/health_tips.html')

def data(request):
    return render(request, 'VICHealth_app/data.html')

def diet(request):
    return render(request, 'VICHealth_app/diet.html')

def gg(request):
    return render(request, 'VICHealth_app/XLp7KVy5AUqC3MihO28i7klWOcVkJKaUY99wVxi1UnQ')

def about_us(request):
    return render(request, 'VICHealth_app/about_us.html')

def sub_info(request):
    club=Club.objects.all()
    form=InputForm()


    context = { "club":club, "form":form }
    return render(request, 'VICHealth_app/sub_info.html', context)
