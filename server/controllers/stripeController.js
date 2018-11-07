require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {

    handlePayment: (req, res) => {

        const amountArray = req.body.amount.toString().split('')
        const pennies = []
        for (var i = 0; i<amountArray.length; i++){
            if(amountArray[i]==='.'){
                if (typeof amountArray[i + 1]==='string'){
                    pennies.push(amountArray[i + 1])
                } else {
                    pennies.push('0')
                }
                if (typeof amountArray[i + 2]==='string'){
                    pennies.push(amountArray[i+2])
                } else {
                    pennies.push('0')
                }
                break;
            } else {
                pennies.push(amountArray[i])
            }
        }
        const convertedAmt = parseInt(pennies.join(''))

        const {token:{id}} = req.body
        
        stripe.charges.create(
            {
                amount: convertedAmt,
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