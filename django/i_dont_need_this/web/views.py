from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.


class index(TemplateView):
    def get(self, request):
        return render(request, "web/index.html", {})

    def post(self, request):
        print(request.POST)
