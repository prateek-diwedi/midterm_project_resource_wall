// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
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
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public/"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
// const resourceRoutes = require("./routes/widgets");

const test = require("./routes/dbRoutes");
//const addUser = require("./routes/addUser");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));

app.use("/", test(db));

// app.use("/resource", resourceRoutes(db));
//app.use("/api/addUser", addUser (db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// --------------------------- get  commands --------------------------------------
// app.get("/", (req, res) => {
//   res.render("index");
// });







////--------------------------- add resource up page-----------------------------
app.get("/add_resources", (req, res) => {
  const email = req.session.email;
  dbHelper.getCategories()
    .then(rows => res.render("add_resources", { rows, email }));


});

////--------------------------- resource page-----------------------------
app.post("/add_resources", (req, res) => {

  // dbHelper.getAllProperties()
  // .then(rows => res.render("resource_view", { rows }));

  let theUrl = req.body.url;
  let theUrlImage = req.body.url_image;
  let categories = req.body.categories;
  console.log('categories', categories);

  const userId = req.session.userId;
  console.log('emailwhile creating resource', userId);
  let theTitle = req.body.title;
  let theDescription = req.body.description;
  let resource = {
    url: theUrl,
    url_image: theUrlImage,
    title: theTitle,
    description: theDescription,
    category_id: categories,
    user_id: userId
  };

  dbHelper.addResource(resource);

  res.redirect("/resource_view");
});


////--------------------------- view resource  page-----------------------------
app.get("/resource_view", (req, res) => {

  console.log('inside resource wiews >>>>>>>>>>>>>>>>>>>>>>', req.session);
  const email = req.session.email;

  dbHelper.getAllProperties(req.query, 10)
    .then(rows => res.render("resource_view", { rows, email }));
});

////--------------------------- resource page-----------------------------
app.post("/resource_view", (req, res) => {
  //const userId = req.session.userId;
  //dbHelper.getAllProperties();

  console.log('aa. post data -->', dbHelper.getAllProperties());

  res.redirect("/resource_view");
});

///// ------------------------ likes -------------------------------

app.post('/api/resources/:resource_id/likes', (req, res) => {
  const resourceId = req.params.resource_id;
  const userId = req.session.userId;
  console.log('logged in user id:', userId);

  dbHelper.addUserResourceLike(userId, resourceId).then((result) => {

    res.status(200).send(`like insert result: ${result.rows[0]}`);
  }).catch(error => {
    console.log('error:', error);
    res.status(500).send(`error inserting like: ${error}`);
  });
});

app.post("/api/like", (req, res) => {
  console.log('data sent to like', dbHelper.increaseLike());
  let liked = 1;
  console.log('below liked--------->', req.body);
  dbHelper.increaseLike(liked);

  res.redirect("/resource_view");
});


///// ------------------------ ratings -------------------------------

app.post('/api/resources/:resource_id/star/ratings', (req, res) => {
  const resourceId = req.params.resource_id;
  const userId = req.session.userId;
  const stars = req.body.star;

  console.log('resource id --->', resourceId, 'stars ---->>', stars);
  console.log('logged in user id:', userId);
  dbHelper.increaseRating(stars, userId, resourceId).then((result) => {
    if (result && result.rows) {
      res.status(200).send(`rating insert result: ${result.rows[0]}`);
    } else {
      res.status(500).send(`error inserting rating:`);
    }
  }).catch(error => {
    console.log('error:', error);
  });
});

// app.post("/api/rating", (req, res) => {
//   console.log('data sent to like', dbHelper.increaseRating());
//   //let rated = 1;
//   console.log('below rated--------->', req.body);
//   dbHelper.increaseRating(stars);

//   res.redirect("/resource_view");
// });

///// ------------------------ Creator Page Navigator -------------------------------

app.get("/api/creator/${creatorId}/creator", (req, res) => {

  console.log('resource creator page >>>>>>>>>>>>>>>>>>>>>>', req.session);
  //const email = req.session.email;
  console.log("test",req.query);
  dbHelper.getCreatorDetails(req.query)
    .then(rows => res.render("creator_profile", { rows }));
});





app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



/* insert query
INSERT INTO users (name, email, password)
VALUES
*/

