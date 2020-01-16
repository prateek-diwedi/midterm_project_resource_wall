-- Drop and recreate Users table (Example)



DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS learning_resources CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;


CREATE TABLE users
 (
   id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
 );


CREATE TABLE categories (
   id SERIAL PRIMARY KEY NOT NULL,
   category_name VARCHAR(255) NOT NULL
 );




 CREATE TABLE learning_resources (
   id SERIAL PRIMARY KEY NOT NULL,
   url TEXT NOT NULL,
   url_image TEXT,
   title VARCHAR(500) NOT NULL,
   description TEXT,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
 );

CREATE TABLE likes (
   id SERIAL PRIMARY KEY NOT NULL,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   resource_id INTEGER REFERENCES learning_resources(id) ON DELETE CASCADE
 );

 CREATE TABLE comments (
   id SERIAL PRIMARY KEY NOT NULL,
   comment TEXT,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   resource_id INTEGER REFERENCES learning_resources(id) ON DELETE CASCADE
 );

 CREATE TABLE ratings (
   id SERIAL PRIMARY KEY NOT NULL,
   rating SMALLINT,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   resource_id INTEGER REFERENCES learning_resources(id) ON DELETE CASCADE
 );




