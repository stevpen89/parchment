module.exports = {
	read: (req, res) => {
		const db = req.app.get('db');
		const {type, user_id} = req.params;

		db.cards.card_read([type, user_id])
			.then(card => res.status(200).send(card[0]))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	create: (req, res) => {
		const db = req.app.get('db');
		const {user_id} = req.params;
		const {tree_type, parent_id} = req.body;

		db.cards.card_create([user_id, tree_type, parent_id])
			.then(card => res.status(200).send(card[0]))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	edit: (req, res) => {
		const db = req.app.get('db');
		const {card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death, o1} = req.body;
		const {card_id} = req.params;

		db.cards.card_edit([card_id, card_name, card_birth, card_death, spouse_name, spouse_birth, spouse_death, o1])
			.then(card => res.status(200).send(card))
			.catch(err => console.log(`Error Message: ${err}`))
	},

	delete: (req, res) => {
		const db = req.app.get('db');
		const {card_id} = req.params;

		db.cards.card_delete([card_id])
			.then(card => res.status(200).send(card))
			.catch(err => console.log(`Error Message: ${err}`))
	},
}