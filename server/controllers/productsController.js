module.exports = {
	readAll: (req, res) => {
		const db = req.app.get('db');
		db.products.products_get_all()
			.then(products => res.status(200).send(products))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	readSingle: (req, res) => {
		const db = req.app.get('db');
		const {sku} = req.params;

		db.products.products_get_single([sku])
			.then(products => res.status(200).send(products[0]))
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

		db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
			.then(product => res.status(200).send(product))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	// search: (req, res) => {
	// 	const db = req.app.get('db');
	// 	const {tags} = req.body;
		
	// 	db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
	// 	.then(product => res.status(200).send(product))
	// 	.catch(err => console.log(`Error Message: ${err}`))

		// if (tags.includes('%journal%')) {
		// 	let tempArr = [];
		// 	db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
		// 		.then(product => {
		// 			product.map(x => tempArr.push(x));
		// 			db.products.products_get_generic()
		// 				.then(generic => {
		// 					generic.map(x => tempArr.push(x));
		// 					res.status(200).send(tempArr);
		// 				})
		// 		})
		// 		.catch(err => console.log(`Error Message: ${err}`))
		// }
		// else {
		// 	db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
		// 		.then(product => res.status(200).send(product))
		// 		.catch(err => console.log(`Error Message: ${err}`))
		// }
	// },

	readCart: (req, res) => {
		req.session.cart ? res.status(200).send(req.session.cart) : res.status(200).send([]);
	},

	addToCart: (req, res) => {
		let tempCart = []
		req.session.cart === undefined ? req.session.cart = [] : tempCart = [...req.session.cart]
		tempCart.push(req.body)
		req.session.cart = tempCart
		console.log(req.session.cart)
		res.status(200).send(req.session.cart)
	},

	rewriteCart: (req, res) => {
		req.session.cart = req.body
		console.log(req.session.cart)
		res.status(200).send(req.session.cart)
	},
}