// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
/////////////////

const dbHelper = require('./lib/db.js');


//////////////////////

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// --------------------------- get  commands --------------------------------------
app.get("/", (req, res) => {
  res.render("index");
});

////--------------------------- sign up page-----------------------------
app.get("/sign_up_page", (req, res) => {
  res.render("sign_up_page");
});

// ------------------------------user sign in -----------------------------
app.post("/sign_up_page", (req, res) => {
  let userName = req.body.username;
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  let user = {
    name: userName,
    email: userEmail,
    password: userPassword
  };

  dbHelper.addUser(user);

  res.redirect('/');
});


////--------------------------- resource up page-----------------------------
app.get("/add_resources", (req, res) => {
  res.render("add_resources");
});

////--------------------------- resource page-----------------------------
app.post("/add_resources", (req, res) => {

  let theUrl = req.body.url;
  let theUrlImage = req.body.url_image;
  let theTitle = req.body.title;
  let theDescription = req.body.description;
  let resource = {
    url: theUrl,
    url_image: theUrlImage,
    title: theTitle,
    description: theDescription
  };

  dbHelper.addResource(resource);

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



/* insert query
INSERT INTO users (name, email, password)
VALUES
*/

