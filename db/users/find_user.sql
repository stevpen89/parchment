SELECT * FROM users
WHERE auth_id = $1
ORDER BY user_id;