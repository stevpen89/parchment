INSERT INTO orders (user_id, purchase_date, products, order_first_name, order_last_name, order_email, order_address, order_city, order_state, order_zip, order_phone)
VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 )
RETURNING *;