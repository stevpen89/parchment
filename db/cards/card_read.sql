SELECT * FROM cards
WHERE tree_type=$1 AND user_id=$2
ORDER BY card_id;