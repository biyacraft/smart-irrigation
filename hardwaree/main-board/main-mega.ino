#include <LiquidCrystal.h>
#include "DHT.h"
#include <ArduinoJson.h>

LiquidCrystal lcd(8, 9, 4, 5, 6, 7);
//constants
const String serial_number = "txt-tdt";
const int relay_Pin = 14;
const int DHT11_Sesnor = 52;
const int rain_Sesnor = 48;
const int low_threshold = 35;
const int high_threshold = 80;

const int moisture_sensor = A8;

const int AirValue = 510;  // This is the value of your sensor when you place it in the open air
const int WaterValue = 415;

//variables
int irrigationAction = -1, wait_for=100;
float humudity_value, temprature_value, moisture_sensor_value, rain_sensor_value, percent = 0;


#define DHTTYPE DHT11
DHT dht(DHT11_Sesnor, DHTTYPE);

void setup() {
  Serial.begin(9600);
  pinMode(relay_Pin, OUTPUT);
  digitalWrite(relay_Pin, LOW);
  lcd.begin(16, 2);
  lcd.print("SMART IRRIGATION");
  lcd.setCursor(5, 1);
  lcd.print("SYSTEM");
  dht.begin();
  delay(3500);
  lcd.clear();
}
void loop() {

  readDTH11_Sesnor();
  moisture_level_detected();

  //Wait for a trigger command from the receiver Arduino

  while (!Serial.available() && wait_for) {
    delay(100);
    wait_for--;
  }



  // Construct the JSON payload
  DynamicJsonDocument jsonDoc(1024);
  jsonDoc["moisture"]["reading"] = percent;
  jsonDoc["temperature"]["reading"] = temprature_value;
  jsonDoc["humidity"]["reading"] = humudity_value;
  jsonDoc["serial_number"] = serial_number;

  String payload;
  serializeJson(jsonDoc, payload);
  Serial.println(payload);

  String payload2;
  deserializeJson(jsonDoc, payload2);
  JsonObject root = jsonDoc.as<JsonObject>();
  Serial.print(payload2);


  rain_sensor_value = digitalRead(rain_Sesnor);
  water_motor_start();
  digitalWrite(relay_Pin, LOW);


  //after sending the json payload it must wait
  //till the response of irrigation action is sent back from the server
  //the implementation of this code goes here
}


void readDTH11_Sesnor() {

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  // Read humidity value as a percentage
  humudity_value = dht.readHumidity();
  // Read temperature as Celsius (the default)
  temprature_value = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(humudity_value) || isnan(temprature_value)) {
    lcd.print(("DHT sensor ERROR!"));
    return;
  }

  lcd.clear();
  lcd.print("Humidity: ");
  // lcd.setCursor(0, 2);
  lcd.print(humudity_value);
  lcd.print("%");
  delay(5000);
  lcd.clear();
  lcd.print("Temperature: ");
  lcd.setCursor(0, 2);
  lcd.print(temprature_value);
  lcd.print(" C");
  delay(5000);
}

void moisture_level_detected() {

  moisture_sensor_value = analogRead(moisture_sensor);
  percent = map(moisture_sensor_value, AirValue, WaterValue, 0, 100);
  // Check if any reads failed and exit early (to try again).
  // if (isnan(moisture_sensor_value) {
  //   lcd.print(("Moisture sensor ERROR!"));
  //   return;
  // }
  lcd.clear();
  lcd.print("Moisture Level :");
  lcd.setCursor(0, 1);
  lcd.print(percent);
  lcd.print("%");
  delay(5000);
}

void water_motor_start() {
  ///the irrigation action code goes over here
  delay(5000);
  digitalWrite(relay_Pin, HIGH);
  lcd.clear();
  lcd.print("irrigation started");
  lcd.setCursor(0, 2);
  lcd.print("Motor ON");
  delay(5000);
}
