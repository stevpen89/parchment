INSERT INTO cards (user_id, tree_type, parent_id)
VALUES ( $1, $2, $3 )
RETURNING *;