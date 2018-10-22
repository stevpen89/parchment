module.exports = {
	readAll: (req, res) => {
		const db = req.app.get('db');

		db.products.products_get_all()
			.then(products => res.status(200).send(products))
			.catch(err => console.log(`Error Message: ${err}`))
	}
}