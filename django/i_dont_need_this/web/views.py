from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login
from django.contrib.auth.models import User
# Create your views here.


class index(TemplateView):
    def get(self, request):
        return render(request, "web/index.html", {})

    def post(self, request):
        print(request.POST)
        return render(request, "web/index.html", {})


class dash(TemplateView):
    def get(self, request):
        return render(request, "web/FrontEnd.html", {})

    def post(self, request):
        user = User.objects.get(username=request.POST.get('phone'))
        if user is None:
            user = User.objects.create_user(
                request.POST.get('phone'), 'test@test.com', 'password')
            user.save()
        user = login(request, user)
        return render(request, "web/FrontEnd.html", {})


class profile(LoginRequiredMixin, TemplateView):
    login_url = '/'

    def get(self, request):
        return render(request, "web/profile.html", {})

    def post(self, request):
        print(request.POST)
        return render(request, "web/FrontEnd.html", {})


def handler404(request, exception, template_name="404.html"):
    response = render_to_response("web/404.html")
    response.status_code = 404
    return response
