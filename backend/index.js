const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/database")();

// ... other middleware code ...
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.get("/", (req, res) => res.send("Home Page test"));

// imporitng local routes
const sensorsRoute = require("./src/app/routes/sensorsRoute");
const AuthRoute = require("./src/app/routes/AuthRoute");
const NotificationRoute = require("./src/app/routes/NotificationRoute");

// route services middleware goes here
app.use("/api/sensors", sensorsRoute);
app.use("/api/auth/", AuthRoute);
app.use("/api/notification/", NotificationRoute);
app.get("/", (req, res) => res.send("Home Page Route"));

// ... other middleware and server setup code goes here...

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
