DROP TABLE presets;
DROP TABLE orders;
DROP TABLE cards;
DROP TABLE users;

CREATE TABLE users (
	user_id       SERIAL PRIMARY KEY,
	user_name     VARCHAR(100),
	user_email    VARCHAR(100),
	auth_id       TEXT,
	auth_picture  TEXT,
	user_admin    VARCHAR(30) DEFAULT 'customer'
);

-- INSERT INTO users (user_name, user_email, auth_id, auth_picture)
-- VALUES ('Guest User', 'guestuser@gmail.com', 'google-name|001010', 'https://lh6.googleusercontent.com/-M0cJ1Sks87Y/AAAAAAAAAAI/AAAAAAAAAEI/BSnAjnFetN4/photo.jpg');

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



CREATE TABLE orders (
  order_id         SERIAL PRIMARY KEY,
  user_id          INTEGER,
  purchase_date    TEXT,
  products         TEXT,
  order_name       VARCHAR(100),
  order_email      VARCHAR(200),
  order_address    VARCHAR(200),
  order_city       VARCHAR(100),
  order_state      VARCHAR(100),
  order_zip        VARCHAR(100),
  order_phone      VARCHAR(100)
);

SELECT * FROM orders;



CREATE TABLE presets (
  preset_id      SERIAL PRIMARY KEY,
  preset_name    VARCHAR (200),
  preset_data    TEXT
);