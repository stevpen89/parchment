module.exports = {
	create: (req, res) => {
		const db = req.app.get('db');
		const {user_id, purchase_date, products, order_name, order_email, order_address, order_city, order_state, order_zip, order_phone} = req.body;

		db.orders.order_create([user_id, purchase_date, products, order_name, order_email, order_address, order_city, order_state, order_zip, order_phone])
			.then(card => res.status(200).send(card[0]))
			.catch(err => console.log(`Error Message: ${err}`))
	},
	retrieve: (req,res)=>{
		const db=req.app.get('db');

		db.orders.order_retrieve([req.params.id])
		.then(order => res.status(200).send(order))
		.catch(err => console.log(`Error Message: ${err}`))
	}
}