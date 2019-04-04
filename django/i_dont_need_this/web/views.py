from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login
from django.contrib.auth.models import User
from .otp import send_otp

from django.contrib.auth import logout


def logout_view(request):
    logout(request)
    return redirect('index')


def about_view(request):
    return render(request, 'web/about.html', {})


def faq_view(request):
    return render(request, 'web/faq.html', {})


class index(TemplateView):
    def get(self, request):
        if request.user.is_authenticated:
            c = {"phnum": request.user.username}
        else:
            c = {"phnum": None}
        return render(request, "web/index.html", {})

    def post(self, request):
        otp = send_otp(request.POST.get('phone'))
        try:
            user = User.objects.get(username=request.POST.get('phone'))
            print("user exists", user)
        except User.DoesNotExist:
            user = User.objects.create_user(
                request.POST.get('phone'), 'test@test.com', 'password')
            user.save()
            print("created user", user)
        if otp == request.POST.get('password'):
            print("validated")
        else:
            print("LOL")
        user = login(request, user)
        return render(request, "web/index.html", {})


class dash(TemplateView):
    def get(self, request):
        return render(request, "web/FrontEnd.html", {})

    def post(self, request):
        otp = send_otp()
        try:
            user = User.objects.get(username=request.POST.get('phone'))
            print("user exists", user)
        except User.DoesNotExist:
            user = User.objects.create_user(
                request.POST.get('phone'), 'test@test.com', 'password')
            user.save()
            print("created user", user)
        if otp == request.POST.get('password'):
            print("validated")
        else:
            print("LOL")
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
