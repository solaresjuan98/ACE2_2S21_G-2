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
  
  delay(10);
}

void loop() 
{
  delay(500);
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
    return;
  }

 

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("% Temperature: ");
  Serial.print(temperature);
  Serial.print("°C ");
  Serial.print(temperatureF);
  Serial.print("°F Heat Index: ");
  Serial.print("Velocidad del Viento: ");
  Serial.print(velviento);
  Serial.print("Km/h");
  Serial.println("");
  Serial.println(lectura);
  Serial.println(voltaje);
 

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
