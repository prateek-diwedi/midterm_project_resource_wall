//PG database client/connection setup
const { Pool } = require('pg');
let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}
const pool = new Pool(dbParams);

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'lightbnb'
// });



// adding new user to database
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ( $1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => {
      if (res.rows.length) {
        console.log('user added to database');
        res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('user not added :', err));
};

// add resources database
const addResource = function (resource) {
  return pool.query(`
  INSERT INTO learning_resources (url, url_image, title, description)
  VALUES ( $1, $2, $3,$4)
  RETURNING *;
  `, [resource.url, resource.url_image, resource.title, resource.description])
    .then(res => {
      if (res.rows.length) {
        console.log('resource added to database');
        res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('user not added :', err));
};


exports.dbParams = dbParams;
exports.addUser = addUser;
exports.addResource = addResource;

