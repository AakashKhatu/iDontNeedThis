#include <SoftwareSerial.h>
#include <Servo.h>

Servo serv1;
int s;
void setup()
{
    serv1.attach(13);
    serv1.write(0);
    Serial.begin(38400);
}

void loop()
{
    if (Serial.available() > 0)
    { // Checks whether data is comming from the serial port
        s = Serial.read();
        if(s==49)
        {
            serv1.write(90);
            Serial.println("open");
        }
        else if (s==50){
          serv1.write(0);
            Serial.println("close");
        }
        Serial.println(s);
    }
}
