const fs = require("fs");
const csv = require("csv-parser");
const KNNRegression = require("ml-knn");

exports.prediction = (sensorData) => {
  return new Promise((resolve, reject) => {
    const features = [];
    const labels = [];
    let predictedAction;

    // Load the dataset from CSV file
    fs.createReadStream(__dirname + "/models/dataset.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Process each row of the CSV data
        const moisture = parseFloat(row.moisture);
        const temperature = parseFloat(row.temperature);
        const humidity = parseFloat(row.humidity);
        const label = parseFloat(row.label);
        // Add the values to the features and labels arrays
        features.push([moisture, temperature, humidity]);
        labels.push(label);
      })
      .on("end", () => {
        // Create and train the kNN regression model
        const k = 5; // Number of nearest neighbors to consider
        const knnModel = new KNNRegression(features, labels, { k });

        // Predict and return prediction

        predictedAction = knnModel.predict(sensorData);
        resolve(predictedAction);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
