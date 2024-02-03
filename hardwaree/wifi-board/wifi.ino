#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <BearSSLHelpers.h>
#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);
  WiFi.begin("sol", "12121212");
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
}

void loop() {


  if (WiFi.status() == WL_CONNECTED) {
    BearSSL::WiFiClientSecure client;
    HTTPClient http;

    http.begin(client, "https://smartirrigate-backend-api.vercel.app/api/sensors/data");
    http.addHeader("Content-Type", "application/json");

    // Disable SSL verification
    client.setInsecure();

    // Wait for a trigger command from the receiver Arduino
    while (!Serial.available()) {
      delay(100);
    }
    // Construct the JSON payload from the main microcontroller
    // Parse the JSON payload

    String payload = "";
    while (Serial.available()) {
      payload += (char)Serial.read();
    }
    DynamicJsonDocument jsonDoc(1024);
    deserializeJson(jsonDoc, payload);
    JsonObject root = jsonDoc.as<JsonObject>();

    // Extract the values of the keys "moisture", "temperature", "humidity", and "serial_number"
    int moistureReading = root["moisture"]["reading"];
    int temperatureReading = root["temperature"]["reading"];
    int humidityReading = root["humidity"]["reading"];
    String serialNumber = root["serial_number"].as<String>();

    String processedData = String("{\"moisture\":{\"reading\":") + String(moistureReading) +
     String("},\"temperature\":{\"reading\":") + String(temperatureReading)
      + String("},\"humidity\":{\"reading\":") + String(humidityReading) 
      + String("},\"serial_number\":\"") + serialNumber + "\"}";

    int httpResponseCode = http.POST(processedData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);



      // Parse the JSON response
      DynamicJsonDocument jsonDoc(1024);
      deserializeJson(jsonDoc, response);
      JsonObject root = jsonDoc.as<JsonObject>();

      // Extract and print the message and predict values
      String message = root["message"].as<String>();
      int predict = root["predict"].as<int>();
      Serial.println("Message: " + message);
      Serial.println("Predict: " + String(predict));
      Serial.println(processedData);
    } else {
      Serial.print("Error on HTTP request: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    WiFi.begin("sol", "12121212");
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
    }
  }

  delay(2000);
}