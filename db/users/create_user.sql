INSERT INTO users (user_name, user_email, auth_id, auth_picture)
VALUES ( $1, $2, $3, $4 )
RETURNING *;