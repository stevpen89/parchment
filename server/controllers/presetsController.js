module.exports = {
	read: (req, res) => {
		const db = req.app.get('db');
		db.presets.presets_read()
			.then(presets => res.status(200).send(presets))
			.catch(err => console.log(`Error Message: ${err}`))
	}
}