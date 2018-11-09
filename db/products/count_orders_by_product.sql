select count(products)
from orders
where products like $1