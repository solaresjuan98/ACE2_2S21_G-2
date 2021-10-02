
#include <SoftwareSerial.h> // libreria que permite establecer pines digitales
#include <DHT.h>
int dhtPin = 13;
float velviento=0.0;
float lectura=0;
DHT dht(dhtPin, DHT11);
const int FOTOPIN = A0;
int valorSensor = 0;
const int LED = 3;
int valorMapeado = 0;
int analogPin = A3;
SoftwareSerial miBT(10, 11);  // pin 10 como RX, pin 11 como TX

void setup(){
  
  miBT.begin(38400);// comunicacion serie entre Arduino y el modulo a 38400 bps
  dht.begin();
  pinMode(FOTOPIN, INPUT);
  pinMode(LED, OUTPUT); 
  delay(50);
}

void loop(){
delay(200);
  lectura=analogRead(A4);
  float val = analogRead(analogPin);
  float voltaje=CalcularVoltaje(val);
  if (voltaje!=0.0&&voltaje>=0.04){
      velviento=VelocidadViento(voltaje);
    }
  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float temperatureF = dht.readTemperature(true);

  if(isnan(humidity) || isnan(temperature) || isnan(temperatureF))
  {
    Serial.println("Error en la lectura del sensor");
    //return;
  }

 valorSensor = analogRead(FOTOPIN);
 valorMapeado = map(valorSensor, 900, 640, 0, 255);
  miBT.println( json_converter(direccion(lectura),velviento,temperature,humidity,valorSensor));

}

String json_converter(char d, float v, float t, float h, float l){
  String json="";
  /*json.concat(d);
  json+=",";
  json.concat(v);
  json+=",";
  json.concat(t);
  json+=",";
  json.concat(h);
  */
  json+="{";
  json+="\"t\":";
  json.concat(t);
  json+=",\"h\":";
  json.concat(h);
  json+=",\"v\":";
  json.concat(v);
  json+=",\"d\":";
  json.concat(d);
  json+=",\"l\":\"";
  json.concat(l);
  json+="\"}";
  return json;
}
char direccion(float dato_direccion){
    if(dato_direccion<=301){
      return 'S';
    }else if(dato_direccion>301&&dato_direccion<=737){
      return 'O';
    }else if(dato_direccion>737&&dato_direccion<=1003){
      return 'N';
    }else if(dato_direccion>1003){
      return 'E';
    }
    return '?';
}
float CalcularVoltaje(float ingreso){
  float retorno=0.0;
  retorno=(ingreso/1023)*5.0;
  return retorno;
  }

 float VelocidadViento(float voltaje){
  float res=0.0;
  res=(122.92*voltaje)-4.8583;
  return res;
  }
