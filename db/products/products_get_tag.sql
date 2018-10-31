SELECT * FROM products
WHERE
product_tags::text like $1 AND
product_tags::text like $2 AND
product_tags::text like $3 AND
product_tags::text like $4 AND
product_tags::text like $5 AND
product_tags::text like $6 AND
product_tags::text like $7 AND
product_tags::text like $8 AND
product_tags::text like $9 AND
product_tags::text like $10;