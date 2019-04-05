from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login
from django.contrib.auth.models import User
from .otp import send_otp
import json
from django.http import HttpResponse
from django.contrib.auth import logout


def logout_view(request):
    logout(request)
    return redirect('index')


def about_view(request):
    return render(request, 'web/about.html', {})


def faq_view(request):
    return render(request, 'web/faq.html', {})


def submit_view(request):
    return render(request, 'web/submit.html', {})


def pay_view(request):
    return render(request, 'web/paymentGateway.html', {})


def otp_view(request):
    resp = send_otp(request.GET['phone'])
    response_data = {}
    response_data['result'] = resp[0]
    response_data['otp'] = resp[1]
    return HttpResponse(json.dumps(response_data), content_type="application/json")


class index(TemplateView):
    def get(self, request):
        if request.user.is_authenticated:
            c = {"phnum": request.user.username}
        else:
            c = {"phnum": None}
        return render(request, "web/index.html", {})

    def post(self, request):
        try:
            user = User.objects.get(username=request.POST.get('phone'))
            print("user exists", user)
        except User.DoesNotExist:
            user = User.objects.create_user(
                request.POST.get('phone'), 'test@test.com', 'password')
            user.save()
            print("created user", user)
        if request.POST.get('otphidden') == request.POST.get('password'):
            print("validated")
            user = login(request, user)
        return render(request, "web/index.html", {})


class dash(TemplateView):
    def get(self, request):
        return render(request, "web/FrontEnd.html", {})

    def post(self, request):
        otp = send_otp(request.POST.get('phone'))
        if 'login' in request.POST:
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
        else:
            print(request.POST)
            return redirect("submit")


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
