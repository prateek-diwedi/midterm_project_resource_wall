-- Users table seeds here (Example)
INSERT INTO users (name, email, password)
 VALUES ('Alice', 'alice@gmail.com', 'alice');

INSERT INTO users (name, email, password)
 VALUES ('Kira', 'kira@gmail.com', 'kira');

 INSERT INTO users (name, email, password)
 VALUES ('Luke', 'luke@gmail.com', 'luke');

 INSERT INTO users (name, email, password)
 VALUES ('Prateek', 'prateek@gmail.com', 'prateek');



 INSERT INTO categories (category_name)
 VALUES ('sports');

  INSERT INTO categories (category_name)
 VALUES ('blogs');

  INSERT INTO categories (category_name)
 VALUES ('news');

  INSERT INTO categories (category_name)
 VALUES ('educational');


  INSERT INTO resource_reviews (comment, liked, rating, user_id)
 VALUES ('comment ', true, 4, 1);

   INSERT INTO resource_reviews (comment, liked, rating, user_id)
 VALUES ('comment 2', true, 3, 2);

   INSERT INTO resource_reviews (comment, liked, rating, user_id)
 VALUES ('comment 3', true, 4, 3);

   INSERT INTO resource_reviews (comment, liked, rating, user_id)
 VALUES ('comment 4', false, 4, 4);



  INSERT INTO learning_resources (url, url_image, title, description, user_id, category_id, resource_review_id)
  VALUES ('hfere', 'luke', 'LUKEISGOOD', 'LUke is awesome', 1, 1, 1);

  INSERT INTO learning_resources (url, url_image, title, description, user_id, category_id, resource_review_id)
  VALUES ('pop', 'Prateek', 'PrateekISGOOD', 'Prateek is awesome', 2, 2, 2);

  INSERT INTO learning_resources (url, url_image, title, description, user_id, category_id, resource_review_id)
  VALUES ('skfjkdsjfk', 'none', 'basketball', 'there is a match tonight', 3, 3, 3);

  INSERT INTO learning_resources (url, url_image, title, description, user_id, category_id, resource_review_id)
  VALUES ('snake', 'cat', 'education', 'Batman', 4, 4, 4);



