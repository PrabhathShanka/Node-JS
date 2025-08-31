const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

//------------------------------
const CustomerRoute = require("./route/CustomerRoute");
const UserRoute = require("./route/UserRoute");
//------------------------------

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/customerDB").then(() => {
  app.listen(port, () => {
    console.log("Server is running on port 3000");
  });
});

// app.use("/", (req, resp, next) => {
//   resp.send("<h1>Server is running</h1>");
// });

app.use("/api/v1/customers", CustomerRoute);
app.use("/api/v1/users", UserRoute);
