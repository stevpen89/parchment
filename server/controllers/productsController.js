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

	// search: (req, res) => {
	// 	const db = req.app.get('db');
	// 	const {tags} = req.body;

	// 	db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
	// 		.then(product => res.status(200).send(product))
	// 		.catch(err => console.log(`Error Message: ${err}`))
	// },

	search: async (req, res) => {
		const db = req.app.get('db');
		const {tags} = req.body;
		const uniqueProducts = (prodArr) => {
	     const uniqueProd = [];
		 prodArr.forEach((p) => {
			const i = uniqueProd.findIndex(x => x.product_sku == p.product_sku);
			if(i <= -1){
			  uniqueProd.push(p);
			}
		  });
		  return uniqueProd;
		}
		try {
			let products = await db.products.products_get_tag([tags[0], tags[1], tags[2], tags[3], tags[4], tags[5], tags[6], tags[7], tags[8], tags[9]])
			if (products.some(p => p.product_tags.tags.includes('missionary'))) {
				const genericJournals = await db.products.products_get_generic();
				const combined = [...products, ...genericJournals];
	 		    return res.status(200).send(uniqueProducts(combined));
			}
	 		return res.status(200).send(uniqueProducts(products));
		} catch (error) { 
		  console.log(`Error Message: ${error}`);
		}
	},

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

	countOrders:(req,res)=>{
		const db = req.app.get('db');
		db.products.count_orders_by_product([req.body.product])
			.then(data => {res.status(200).send(data)})
			.catch(err => console.log(`Error Message: ${err}`))
	}
}
