from django.http import HttpResponse
import requests

from django.contrib.auth.decorators import login_required


@login_required
def scanned(request):
    # resp = requests.get("rpi url here")
    return HttpResponse("You scanned a qr code")
