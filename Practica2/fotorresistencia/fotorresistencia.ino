const int FOTOPIN = A0;
int valorSensor = 0;
const int LED = 3;
int valorMapeado = 0;

void setup() {
  pinMode(FOTOPIN, INPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  valorSensor = analogRead(FOTOPIN);
  valorMapeado = map(valorSensor, 900, 640, 0, 255);
  analogWrite(LED, valorMapeado);
delay(1000);
  Serial.print("Valor del Sensor: ");
  Serial.println(valorSensor);
  Serial.print("Valor del Sensor Mapeado: ");
  Serial.println(valorMapeado);

}
