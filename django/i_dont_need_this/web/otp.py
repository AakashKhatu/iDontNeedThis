import requests
import random


def send_otp(number):
    url = "https://www.fast2sms.com/dev/bulk"

    otp = random.randint(10000, 99999)
    querystring = {"authorization": "ZM2aEdmsy3WHNI8xejK6kiJ4hCYrBuwfn9t5QSLpov0VRb7lcP0qHGS5fkgWtPNX2YhFrQy9JnBOZTD6",
                   "sender_id": "FSTSMS", "language": "english", "route": "qt",
                   "numbers": number, "message": "8528",
                   "variables": "{AA}", "variables_values": otp}
    headers = {
        'cache-control': "no-cache"
    }
    response = requests.request(
        "GET", url, headers=headers, params=querystring)
    return (response.ok, otp)
