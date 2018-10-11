INSERT INTO cards (user_id, tree_type, parent_id, o1)
VALUES ( $1, $2, $3, $4 )
RETURNING *;