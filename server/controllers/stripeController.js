require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {

    handlePayment: (req, res) => {
        const { amount, token:{id}} = req.body
        stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                source: id,
                description: "Test charge from Steven"
            },
            (err, charge) => {
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log(charge)
                    return res.status(200).send(charge)
                }
            }
        )
    }
}