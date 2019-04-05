from django.http import HttpResponse
import requests
from django.contrib.auth.decorators import login_required


def scanned(request):
    rpi_ip = "192.168.0.10:5000"
    box_id = request.GET["id"]
    box_state = request.GET["open"]
    # return HttpResponse(
    #     "invalid arguments in url")
    print("qr code of box with id: {0} scanned".format(box_id))
    url = "http://"+rpi_ip+"/?open="+box_state
    response = requests.request("GET", url)
    return HttpResponse(
        "Box is currently {0}".format(
            "opened" if box_state == "True" else "Closed"))
