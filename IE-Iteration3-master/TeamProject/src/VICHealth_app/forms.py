from django import forms

class InputForm(forms.Form):
    postcode = forms.CharField()
    activity = forms.CharField()
