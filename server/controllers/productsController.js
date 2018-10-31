module.exports = {
	readAll: (req, res) => {
		const db = req.app.get('db');
		db.products.products_get_all()
			.then(products => res.status(200).send(products))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	readSingle: (req,res)=>{
		const db = req.app.get('db');
		db.products.products_get_single([req.params.sku])
		.then(products=> res.status(200).send(products))
		.catch(err => console.log(`Error Message: ${err}`))
	},

	editJournal: (req, res) => {
		const db = req.app.get('db');
		const {o1} = req.body;
		const {sku} = req.params;

		db.products.products_edit_journal([sku, o1])
			.then(product => res.status(200).send(product))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	search: (req, res) => {
		const db = req.app.get('db');
		const {tags} = req.body;
		// res.status(200).send(tags[0])

		db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
			.then(product => res.status(200).send(product))
			.catch(err => console.log(`Error Message: ${err}`))
	}
}