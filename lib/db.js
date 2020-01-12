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


////------------------------- get all the resources ----------------------------
const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT learning_resources.*, avg(resource_reviews.rating) as average_rating
  FROM learning_resources
  LEFT JOIN users ON users.id = user_id
  LEFT JOIN categories ON categories.id = category_id
  LEFT JOIN resource_reviews ON resource_reviews.id = resource_review_id
  `;

  // 3
  if (options.description) {
    queryParams.push(`%${options.description}%`);
    queryString += `WHERE description ILIKE $${queryParams.length} `;
  }



  // // minimum price  search
  // if (options.minimum_price_per_night) {
  //   queryParams.push(`${options.minimum_price_per_night}`);
  //   queryString += `AND properties.cost_per_night/100 >= $${queryParams.length} `;
  // }

  // /// maximum price search
  // if (options.maximum_price_per_night) {
  //   queryParams.push(`${options.maximum_price_per_night}`);
  //   queryString += `AND properties.cost_per_night/100 <= $${queryParams.length} `;
  // }

  // // minimum rating
  // if (options.minimum_rating) {
  //   queryParams.push(`${options.minimum_rating}`);
  //   queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  // }


  // // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY learning_resources.id

  LIMIT $${queryParams.length};
  `;

  // 5
  //console.log('data retreived:',queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};


exports.dbParams = dbParams;
exports.addUser = addUser;
exports.addResource = addResource;
exports.getAllProperties = getAllProperties;
