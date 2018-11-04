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
  tree_type    TEXT,
  parent_id    INTEGER      DEFAULT NULL,
  card_name    VARCHAR(100) DEFAULT NULL,
  card_birth   VARCHAR(100) DEFAULT NULL,
  card_death   VARCHAR(100) DEFAULT NULL,
  spouse_added BOOLEAN      DEFAULT FALSE,
  spouse_name  VARCHAR(100) DEFAULT NULL,
  spouse_birth VARCHAR(100) DEFAULT NULL,
  spouse_death VARCHAR(100) DEFAULT NULL,
  o1           JSON         DEFAULT NULL
);

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 0, 'bob', '1960', '2222', false, 'erica', '1960', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 1, 'jim', '1980', '2222', false, 'kylie', '1980', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 1, 'karen', '1980', '2222', false, 'mike', '1980', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 1, 'charlie', '1980', '2222', false, 'kiera', '1980', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death)
VALUES (1, 'crazy', 2, 'kaitlin', '2000', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 2, 'jessica', '2000', '2222', false, 'scott', '2000', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 3, 'jayquelin', '2000', '2222', false, 'ryan', '2000', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 4, 'mike', '2000', '2222', false, 'charleese', '2000', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 6, 'arnold', '2020', '2222', false, 'tiffany', '2020', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 6, 'deshante', '2020', '2222', false, 'zofran', '2020', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 7, 'wesley', '2020', '2222', false, 'shanequa', '2020', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 7, 'taryn', '2020', '2222', false, 'lafawnduh', '2020', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death)
VALUES (1, 'crazy', 8, 'steven', '2020', '2222', false, 'jana', '2020', '2222');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death, o1)
VALUES (1, 'binary', null, null, null, null, false, null, null, null, '{"a": "hello", "a1": "", "a1a": "", "a1a1": "", "a1a1d1": "", "a1a1d2": "", "a1a2": "", "a1a2d1": "", "a1a2d2": "", "a1ad1": "", "a1ad2": "", "a1b": "", "a1b1": "", "a1b1d1": "", "a1b1d2": "", "a1b2": "", "a1b2d1": "", "a1b2d2": "", "a1bd1": "", "a1bd2": "", "a1d1": "", "a1d2": "", "a2": "", "a2a": "", "a2a1": "", "a2a1d1": "", "a2a1d2": "", "a2a2": "", "a2a2d1": "", "a2a2d2": "", "a2ad1": "", "a2ad2": "", "a2b": "", "a2b1": "", "a2b1d1": "", "a2b1d2": "", "a2b2": "", "a2b2d1": "", "a2b2d2": "", "a2bd1": "", "a2bd2": "", "a2d1": "", "a2d2": "", "ad1": "", "ad2": "", "b": "", "b1": "", "b1a": "", "b1a1": "", "b1a1d1": "", "b1a1d2": "", "b1a2": "", "b1a2d1": "", "b1a2d2": "", "b1ad1": "", "b1ad2": "", "b1b": "", "b1b1": "", "b1b1d1": "", "b1b1d2": "", "b1b2": "", "b1b2d1": "", "b1b2d2": "", "b1bd1": "", "b1bd2": "", "b1d1": "", "b1d2": "", "b2": "", "b2a": "", "b2a1": "", "b2a1d1": "", "b2a1d2": "", "b2a2": "", "b2a2d1": "", "b2a2d2": "", "b2ad1": "", "b2ad2": "", "b2b": "", "b2b1": "", "b2b1d1": "", "b2b1d2": "", "b2b2": "", "b2b2d1": "", "b2b2d2": "", "b2bd1": "", "b2bd2": "", "b2d1": "", "b2d2": "", "bd1": "", "bd2": ""}');

INSERT INTO cards (user_id, tree_type, parent_id, card_name, card_birth, card_death, spouse_added, spouse_name, spouse_birth, spouse_death, o1)
VALUES (1, 'single', null, null, null, null, false, null, null, null, '{"a": "hello", "a1": "", "a1a": "", "a1a1": "", "a1a1d1": "", "a1a1d2": "", "a1a2": "", "a1a2d1": "", "a1a2d2": "", "a1ad1": "", "a1ad2": "", "a1b": "", "a1b1": "", "a1b1d1": "", "a1b1d2": "", "a1b2": "", "a1b2d1": "", "a1b2d2": "", "a1bd1": "", "a1bd2": "", "a1d1": "", "a1d2": "", "a2": "", "a2a": "", "a2a1": "", "a2a1d1": "", "a2a1d2": "", "a2a2": "", "a2a2d1": "", "a2a2d2": "", "a2ad1": "", "a2ad2": "", "a2b": "", "a2b1": "", "a2b1d1": "", "a2b1d2": "", "a2b2": "", "a2b2d1": "", "a2b2d2": "", "a2bd1": "", "a2bd2": "", "a2d1": "", "a2d2": "", "ad1": "", "ad2": ""}');

SELECT * FROM cards;



CREATE TABLE products (
  product_sku      SERIAL PRIMARY KEY,
  product_name     VARCHAR (200),
  product_tags     JSON,
  product_image    TEXT,
  product_thumbs   JSON,
  product_desc     VARCHAR(8000),
  product_price    FLOAT,
  o1               TEXT
);

INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price)
VALUES ('Binary Family History Blanket', '{"tags":["blanket","binary","animals","geometric"]}', 'https://pbs.twimg.com/profile_images/878962163737665537/OLAUQNQe_400x400.jpg', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99);
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price)
VALUES ('Parents and Kids Family History Blanket', '{"tags":["blanket","inverted","family","geometric","geneaology"]}', 'https://images.unsplash.com/photo-1540844775339-de8c67e13da4?ixlib=rb-0.3.5&s=fc4fae50596e7b8bea134cc641acea2c&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99);
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price, o1)
VALUES ('Personalized Missionary Journal', '{"tags":["journal","missionary","state","alabama"]}', 'https://images.unsplash.com/photo-1540889539617-6236fa68e2f0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=64923c5e7a9e7b435b9058949a2cb5d8&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99, '["title","subtitle","date"]');
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price)
VALUES ('Bear Baby Blanket', '{"tags":["blanket","baby","animals","geometric"]}', 'https://images.unsplash.com/photo-1540845692348-b9d2bc813a63?ixlib=rb-0.3.5&s=b0c0bbbebc81382380cd4b826ba5083d&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99);
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price, o1)
VALUES ('EveryDay Journal Mountains', '{"tags":["journal","animal","nature","scenic"]}', 'https://images.unsplash.com/photo-1540877644327-477011fe0afd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e288ba6f8f31ef9b859f41ef9a5d9b7&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99, '["title","subtitle"]');
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price, o1)
VALUES ('EveryDay Journal Mountains', '{"tags":["journal","animal","nature","scenic"]}', 'https://images.unsplash.com/photo-1540877644327-477011fe0afd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e288ba6f8f31ef9b859f41ef9a5d9b7&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99, '["title","subtitle","date"]');
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price, o1)
VALUES ('EveryDay Journal Mountains', '{"tags":["journal","animal","nature","scenic"]}', 'https://images.unsplash.com/photo-1540877644327-477011fe0afd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e288ba6f8f31ef9b859f41ef9a5d9b7&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99, '["title","subtitle","date"]');
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price, o1)
VALUES ('EveryDay Journal Mountains', '{"tags":["blanket","single","nature","scenic"]}', 'https://images.unsplash.com/photo-1540877644327-477011fe0afd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e288ba6f8f31ef9b859f41ef9a5d9b7&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99, '5');
INSERT INTO products (product_name, product_tags, product_image, product_thumbs, product_desc, product_price, o1)
VALUES ('Cold Outside Holiday Blanket', '{"tags":["blanket","holiday","snow","cute"]}', 'https://images.unsplash.com/photo-1418662589339-364ad47f98a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=235f484b2cdafba4d0e2fa382f09286f&auto=format&fit=crop&w=400&q=80', '{"thumbnails":["http://image.jpg","http://image.jpg"]}', 'ultra fuzzy soft lorem ipsum blanket waifu...', 12.99, '1');
SELECT * FROM products;



CREATE TABLE orders (
	order_id      SERIAL PRIMARY KEY,
	user_id       INTEGER REFERENCES users(user_id),
	purchase_date TEXT,
	product_skus  TEXT,
	order_details TEXT,
  product_type  VARCHAR(100)
);

SELECT * FROM orders;


CREATE TABLE presets (
  preset_id      SERIAL PRIMARY KEY,
  preset_name    VARCHAR (200),
  preset_data    TEXT
);



SELECT * FROM products;