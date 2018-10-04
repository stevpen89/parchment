DROP TABLE users;

CREATE TABLE users (
	user_id       SERIAL PRIMARY KEY,
	user_name     VARCHAR(100),
	user_email    VARCHAR(100),
	auth_id       TEXT,
	auth_picture  TEXT
);

INSERT INTO users (user_name, user_email, auth_id, auth_picture)
VALUES ('Mr. Steven', 'someemail@gmail.com', 'google-name|001010', 'https://lh6.googleusercontent.com/-M0cJ1Sks87Y/AAAAAAAAAAI/AAAAAAAAAEI/BSnAjnFetN4/photo.jpg');

select * from users;