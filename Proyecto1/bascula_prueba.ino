#include "HX711.h"

#define DEBUG_HX711

const int trigPin = 13;  //Trig Ultrasons -> pin 13
const int echoPin = 12;  //Echo Ultrasons -> pin 12
long duracion, distancia;
int val;

// Parámetro para calibrar el peso y el sensor
#define CALIBRACION 27600.0

// Pin de datos y de reloj
byte pinData = 3;
byte pinClk = 2;

// Objeto HX711
HX711 bascula;

void setup() {

#ifdef DEBUG_HX711
  // Iniciar comunicación serie
  Serial.begin(9600);
  Serial.println("[HX7] Inicio del sensor HX711");
#endif

  // Iniciar sensor
  bascula.begin(pinData, pinClk);
  // Aplicar la calibración
  bascula.set_scale(CALIBRACION);
  // Iniciar la tara
  // No tiene que haber nada sobre el peso
  bascula.tare();

  pinMode(trigPin, OUTPUT);  //Trig
  pinMode(echoPin, INPUT);   //Echo
}

void loop() {
UltraSonico();
}

void UltraSonico() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Calcul de l'écho
  duracion = pulseIn(echoPin, HIGH);

  distancia = duracion * 340 / (2 * 10000);

  if ((distancia >=40 && distancia <= 60)) {
    Serial.println(distancia);
    Serial.println(" cm ");
    
  }
  else {
    Serial.print("USTED ESTA SENTADO ");
    Serial.println(distancia);
    Serial.println(" cm ");
    bas();
  }

  delay(1000);
}

void bas(){
  #ifdef DEBUG_HX711
  Serial.print("[HX7] Leyendo: ");
  Serial.print(bascula.get_units()*-1, 1);
  Serial.print(" Kg");
  Serial.println();
  #endif
  }
