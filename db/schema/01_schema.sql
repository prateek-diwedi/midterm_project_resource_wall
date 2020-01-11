-- Drop and recreate Users table (Example)
CREATE DATABASE midterm;
\c midterm


DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS learning_resources CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS resource_reviews CASCADE;


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

  CREATE TABLE resource_reviews (
   id SERIAL PRIMARY KEY NOT NULL,
   comment TEXT,
   liked BOOLEAN,
   rating SMALLINT NOT NULL DEFAULT 0,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
 );


 CREATE TABLE learning_resources (
   id SERIAL PRIMARY KEY NOT NULL,
   url TEXT NOT NULL,
   url_image TEXT,
   title VARCHAR(500) NOT NULL,
   description TEXT,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
   resource_review_id INTEGER REFERENCES resource_reviews(id) ON DELETE CASCADE
 );






