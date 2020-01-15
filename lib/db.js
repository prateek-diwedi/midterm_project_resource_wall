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



// ----------------adding new user to database ----------------
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

////  ------------------ find user in the database --------------
const findUser = function (email) {
  return pool.query(`
    SELECT email, password
    FROM users
    WHERE email = $1
  `, [email])
    .then(res => {
      console.log('res and rows', res.rows);
      if (res.rows.length) {
        console.log('user loged in');
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('user not logged in :', err));
};

// ---------------------------- get categories from database ------------------------------
const getCategories = function (options) {
  let queryString = `
  SELECT *
  FROM categories;
  `;

  return pool.query(queryString)
    .then(res => res.rows);
};

// const createCategory = `
//   INSERT INTO categories (category_name)
//   VALUES ($1)
//   RETURNING *;
// `;

// const createResource = `
// INSERT INTO learning_resources (url, url_image, title, description, category_id)
//   VALUES ( $1, $2, $3, $4, $5)
//   RETURNING *;
// `;

// ----------------------------- add resources database -----------------
const addResource = function (resource) {

  return pool.query(`
  INSERT INTO learning_resources (url, url_image, title, description, user_id, category_id)
    VALUES ( $1, $2, $3, $4, $5, $6)
    RETURNING *;
  `, [resource.url, resource.url_image, resource.title, resource.description, resource.user_id, resource.category_id])
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


// ----------------------------- increase like -----------------
const increaseLike = function (liked) {
  return pool.query(`
INSERT INTO likes (liked)
VALUES ( $1 )
RETURNING *;
`, [liked])
    .then(res => {
      if (res.rows.length) {
        console.log('like added to database');
        res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error('like not added :', err));
};

////------------------------- get all the resources ----------------------------
const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT learning_resources.*, ROUND (avg(ratings.rating)) as rating, count(likes.liked) as liked
  FROM learning_resources
  LEFT JOIN users ON users.id = user_id
  LEFT JOIN categories ON categories.id = category_id
  LEFT JOIN likes ON like_id = learning_resources.id
  LEFT JOIN comments ON comment_id = learning_resources.id
  LEFT JOIN ratings ON rating_id = learning_resources.id
  `;

  // 3
  if (options.search) {
    queryParams.push(`%${options.search}%`);
    queryString += `WHERE description ILIKE $${queryParams.length} `;
    // queryString += `WHERE title ILIKE $${queryParams.length} `;
  }

  //  search
  if (options.search) {
    queryParams.push(`%${options.search}%`);
    queryString += `OR title ILIKE $${queryParams.length} `;
  }

  //
  queryParams.push(limit);
  queryString += `
  GROUP BY learning_resources.id
  ORDER BY learning_resources.id DESC
  LIMIT $${queryParams.length};
  `;

  // return statement
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};




exports.dbParams = dbParams;
exports.addUser = addUser;
exports.addResource = addResource;
exports.getAllProperties = getAllProperties;
exports.findUser = findUser;
exports.getCategories = getCategories;
exports.increaseLike = increaseLike;
