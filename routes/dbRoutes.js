const express = require('express');
const router = express.Router();



const dbHelper = require('../lib/db');

module.exports = (db) => {
  router.get('/sign_in_page', (req, res) => {
    res.render(`login_page`);
  });

  // --------------------------- get  commands --------------------------------------
  router.get("/", (req, res) => {
    const email = req.session.email;
    if (email) {
      let templateVars = { email: email };
      res.render("index", templateVars);
    } else {
      res.render("index", { email });
    }
  });

  ////--------------------------- sign up page-----------------------------
  router.get("/sign_up_page", (req, res) => {
    const email = req.session.email;
    res.render("sign_up_page", { email });
  });


  // ------------------------------user sign up \\ add user in database -----------------------------
  router.post("/sign_up_page", (req, res) => {
    const userId = req.session.userId;
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

    res.redirect('/resource_view');
  });


  //// ---------------------------- user sign in ----------------------------
  router.post("/login_page", (req, res) => {
    const userId = req.session.userId;
    let email = req.body.email;
    console.log('email in the box', email);
    let pass = req.body.password;
    console.log('pass in the box', pass);
    let userMail = req.session;
    console.log('username ________-------------______------>>>', userMail);
    const userFound = dbHelper.findUser(email)
      .then(data => {
        console.log('user found in the sign in page -------->', data);
        if (data) {

          if ((pass === data.password)) {
            email === data.email;
            console.log('inside if  pass-------->>>>>', data.password);
            console.log('data:', data);
            req.session.userId = data.id;
            req.session.email = data.email;
            console.log('inside if email >>>>>>>>>>>-------->>>>>', req.session.email);
            return res.redirect("/resource_view");
          } else {
            res.status(403).send("password no good!!!!");
          }
        } else { // no user found
          res.status(403).send("user no findy!");
        }
      });


  });

  //// ---------------------------- logout ----------------------------
  router.get("/logout", (req, res) => {
    req.session = null;
    res.render("index", { email: null });
  });

  ////// -------------------------  update details page ------------------
  router.get("/update-profile", (req, res) => {
    const email = req.session.emai;
    res.render("update_profile", { email });
  });

  ///////// -------------------------- update profile --------------------------
  router.post("/updateprofile", (req, res) => {
    const userId = req.session.userId;
    console.log('user id in the request body -----<<>>', userId);
    let userName = req.body.username;
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    let user = {
      name: userName,
      email: userEmail,
      password: userPassword,
      id: userId
    };

    const userUpdate = dbHelper.updateUser(user)
      .then(data => {
        if (data) {
          req.session.userId = data.id;
          req.session.email = data.email;
          return res.redirect('/resource_view');
        } else {
          res.status(403).send("user not updated!!!!");
        }
      });


  });










  return router;
};



