#include <Servo.h>

Servo s;
void setup()
{
  s.attach(9);
  pinMode(13, OUTPUT);
}

void loop()
{
  s.write(90);
  digitalWrite(13, HIGH);
  delay(2000);
  s.write(0);
  digitalWrite(13, LOW);
  delay(2000);
}
