module.exports = {
	read: (req, res) => {
		const db = req.app.get('db');
		const {tree_id} = req.params;

		db.cards.card_read([tree_id])
			.then(node => res.status(200).send(node))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	create: (req, res) => {
		const db = req.app.get('db');
		const {user_id} = req.params;
		const {tree_id, parent_id} = req.body;

		db.cards.card_create([user_id, tree_id, parent_id])
			.then(trip => res.status(200).send(trip[0]))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	edit: (req, res) => {
		const db = req.app.get('db');
		const {card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death} = req.body;
		const {card_id} = req.params;

		db.cards.card_edit([card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death, card_id])
			.then(node => res.status(200).send(node))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	delete: (req, res) => {
		const db = req.app.get('db');
		const {card_id} = req.params;

		db.cards.card_delete([card_id])
			.then(node => res.status(200).send(node))
			.catch(err => console.log(`Error Message: ${err}`))
	},
}