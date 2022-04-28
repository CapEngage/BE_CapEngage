const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./db/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });
// define a root/default route
app.options("*", cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Origin', '*',
      'Access-Control-Allow-Headers', 'Content-Type',
    'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//

app.get("/", (req, res) => {
  res.json({ message: "CapEngage | Node" });
});
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
