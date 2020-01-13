const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/sign_in_page', (req, res) => {
    res.render(`login_page`);
  });



  return router;
};
