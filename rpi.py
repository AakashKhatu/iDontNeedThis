import bluetooth
from flask import Flask, request
app = Flask(__name__)


@app.route("/")
def sendMessageTo():
  global sock
  i = request.args["open"]
  print(i)
  sock.send(bytes(i))
  
def lookUpNearbyBluetoothDevices():
  nearby_devices = bluetooth.discover_devices()
  for bdaddr in nearby_devices:
    print (str(bluetooth.lookup_name( bdaddr )) + " [" + str(bdaddr) + "]")

if __name__ == "__main__":
  port = 1
  sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
  sock.connect(("00:21:13:01:99:52", port))
  sock.close()
  app.run(debug=True)

