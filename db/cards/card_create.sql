INSERT INTO cards (user_id, tree_id, parent_id)
VALUES ( $1, $2, $3 )
RETURNING *;