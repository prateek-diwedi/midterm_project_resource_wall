const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/api", (req, res) => {
    db.query(`
    SELECT * FROM users;
    `)
      .then(data => {
        const users = data.rows;
        res.json({ users });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};




// app.post("/sign_up_page", (req, res) => {
//   let userName = req.body.username;
//   let userEmail = req.body.email;
//   let userPassword = req.body.password;
//   let user = {
//     name: userName,
//     email: userEmail,
//     password: userPassword
//   };

//   dbHelper.addUser(user);

//   res.redirect('/');
// });

// // adding new user to database
// const addUser = function (user) {
//   return pool.query(`
//   INSERT INTO users (name, email, password)
//   VALUES ( $1, $2, $3)
//   RETURNING *;
//   `, [user.name, user.email, user.password])
//     .then(res => {
//       if (res.rows.length) {
//         console.log('user added to database');
//         res.rows[0];
//       } else {
//         return null;
//       }
//     })
//     .catch(err => console.error('user not added :', err));
// };
