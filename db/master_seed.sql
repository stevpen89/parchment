DROP TABLE orders;
DROP TABLE products;
DROP TABLE cards;
DROP TABLE users;

CREATE TABLE users (
	user_id       SERIAL PRIMARY KEY,
	user_name     VARCHAR(100),
	user_email    VARCHAR(100),
	auth_id       TEXT,
	auth_picture  TEXT,
	user_admin    BOOLEAN DEFAULT FALSE
);

INSERT INTO users (user_name, user_email, auth_id, auth_picture)
VALUES ('Mr. Steven', 'someemail@gmail.com', 'google-name|001010', 'https://lh6.googleusercontent.com/-M0cJ1Sks87Y/AAAAAAAAAAI/AAAAAAAAAEI/BSnAjnFetN4/photo.jpg');

SELECT * FROM users;



CREATE TABLE cards (
  card_id      SERIAL PRIMARY KEY,
  user_id      INTEGER,
  tree_id      INTEGER,
  parent_id    INTEGER,
  card_name    VARCHAR(100) DEFAULT NULL,
  card_birth   VARCHAR(100) DEFAULT NULL,
  card_death   VARCHAR(100) DEFAULT NULL,
  spouse_name  VARCHAR(100) DEFAULT NULL,
  spouse_birth VARCHAR(100) DEFAULT NULL,
  spouse_death VARCHAR(100) DEFAULT NULL
);

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 0, 'bob', '1960', '2222', 'erica', '1960', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 1, 'jim', '1980', '2222', 'kylie', '1980', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 1, 'karen', '1980', '2222', 'mike', '1980', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 1, 'charlie', '1980', '2222', 'kiera', '1980', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death)
VALUES (1, 1, 2, 'kaitlin', '2000', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 2, 'jessica', '2000', '2222', 'scott', '2000', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 3, 'jayquelin', '2000', '2222', 'ryan', '2000', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 4, 'mike', '2000', '2222', 'charleese', '2000', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 6, 'arnold', '2020', '2222', 'tiffany', '2020', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 6, 'deshante', '2020', '2222', 'zofran', '2020', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 7, 'wesley', '2020', '2222', 'shanequa', '2020', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 7, 'taryn', '2020', '2222', 'lafawnduh', '2020', '2222');

INSERT INTO cards (user_id, tree_id, parent_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death)
VALUES (1, 1, 8, 'steven', '2020', '2222', 'jana', '2020', '2222');

SELECT * FROM cards;



CREATE TABLE products (
  product_sku      SERIAL PRIMARY KEY,
  product_name     VARCHAR (200),
  product_tags     JSON,
  product_image    TEXT,
  product_thumbs   JSON,
  product_desc     VARCHAR(10000)
);

INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc)
VALUES ('texas journal', '{"tags":["texas","flavor town"]}', 'http://image.jpg', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'This journal is real texas stuff');

SELECT * FROM products;



CREATE TABLE orders (
	order_id      SERIAL PRIMARY KEY,
	user_id       INTEGER REFERENCES users(user_id),
	purchase_date TEXT,
	product_sku   INTEGER,
	order_details JSON
);

SELECT * FROM orders;