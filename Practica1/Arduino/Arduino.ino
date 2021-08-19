#include <DHT.h>


int dhtPin = 13;
float velviento=0.0;
float lectura=0;
DHT dht(dhtPin, DHT11);


int analogPin = A3;
void setup() 
{
  Serial.begin(9600);
  dht.begin();
  
  delay(50);
}

void loop() 
{
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

 


  Serial.println( json_converter(direccion(lectura),velviento,temperature,humidity));
  
 

}
String json_converter(char d, float v, float t, float h){
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
  json+=",\"d\":\"";
  json.concat(d);
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
