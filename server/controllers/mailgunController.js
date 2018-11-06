require ( 'dotenv' ).config();
const api_key = process.env.MAILGUN_KEY;
const DOMAIN = 'parchmentgoods.com';
const mailgun = require('mailgun-js')({apiKey:api_key, domain:DOMAIN});
const emailController = require ( './emailController' );

module.exports={
	send: (req, res)=>{
		const {subject, email, content} = req.body
		var data = {
			from    : `${email}`,
			to      : `support@parchmentgoods.com`,
			subject : `${subject}`,
			text    : `${content}`,
		};
		mailgun.messages().send(data, function (error, body) {
		console.log(body);
	});
		res.status(200).send(`Email sent`)
	},

	sendCustomer: (req, res)=>{
		const { firstName, lastName, email, address, city, state, zip, phone, time, sum, shipping, total, info, ticketID } = req.body
		var data = {
			from    : 'Customer Service <support@parchmentgoods.com>',
			to      : `${email}`,
			subject : `Customer Purchase`,
			html    : `${emailController.html( firstName, lastName, email, address, city, state, zip, phone, time, sum, shipping, total, info, ticketID, false )}`,
		};
		mailgun.messages().send(data, function (error, body) {
		console.log(body);
	});
		res.status(200).send(`Admin email sent ${email}`)
	},

	sendAdmin: (req, res)=>{
		const { firstName, lastName, email, address, city, state, zip, phone, time, sum, shipping, total, info, ticketID } = req.body
		var data = {
			from    : 'Customer Service <support@parchmentgoods.com>',
			to      : `support@parchmentgoods.com`,
			subject : `Customer Purchase #${ticketID}`,
			html    : `${emailController.html( firstName, lastName, email, address, city, state, zip, phone, time, sum, shipping, total, info, ticketID, true )}`,
		};
		mailgun.messages().send(data, function (error, body) {
		console.log(body);
	});
		res.status(200).send(`Admin email sent ${email}`)
	}
}