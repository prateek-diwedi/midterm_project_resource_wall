const express = require('express');
const router = express.Router();



const dbHelper = require('../lib/db');

module.exports = (db) => {
  router.get('/sign_in_page', (req, res) => {
    res.render(`login_page`);
  });

  // --------------------------- get  commands --------------------------------------
  router.get("/", (req, res) => {
    res.render("index");
  });

  ////--------------------------- sign up page-----------------------------
  router.get("/sign_up_page", (req, res) => {
    res.render("sign_up_page");
  });


  // ------------------------------user sign up \\ add user in database -----------------------------
  router.post("/sign_up_page", (req, res) => {
    let userName = req.body.username;
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    let user = {
      name: userName,
      email: userEmail,
      password: userPassword,
      username: req.session["email"]
    };

    dbHelper.addUser(user);

    res.redirect('/');
  });


  //// ---------------------------- user sign in ----------------------------
  router.post("/login_page", (req, res) => {
    let email = req.body.email;
    console.log('email in the box', email);
    let pass = req.body.password;
    console.log('pass in the box', pass);
    let userMail = req.session["email"];
    console.log('username', userMail);
    const userFound = dbHelper.findUser(email)
      .then(data => {
        console.log('user found in the sign in page -------->', data);
        if (data) {

          if ((pass, data.password)) {
            email === data.email;
            console.log('inside if  pass-------->>>>>', data.password);
            console.log('inside if -------->>>>>', req.session);
            return res.redirect("/resource_view");
          } else {
            res.status(403).send("password no good!!!!");
          }
        } else { // no user found
          res.status(403).send("user no findy!");
        }
      });


  });





  return router;
};
