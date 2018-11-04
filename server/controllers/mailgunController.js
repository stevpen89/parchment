require ( 'dotenv' ).config();
const api_key = process.env.MAILGUN_KEY;
const DOMAIN = 'parchmentgoods.com';
const mailgun = require('mailgun-js')({apiKey:api_key, domain:DOMAIN});

module.exports={
	send: (req,res)=>{
		const {address,subject,content} = req.body
		var data = {
			from: 'Customer Service <support@parchmentgoods.com>',
			to: `${address}, support@parchmentgoods.com`,
			subject: `${subject}`,
			text: `${content}`
		};
		mailgun.messages().send(data, function (error, body) {
		console.log(body);
	});
		res.status(200).send(`email sent to ${address}`)
	}
}