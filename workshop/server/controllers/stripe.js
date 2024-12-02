const prisma = require("../config/prisma")
const stripe = require("stripe")('sk_test_51QI7SkD07pUN951SUwgwQJeghU9Ni1MHASKUSQgr1VWTLlWBIX5BJjYYALY5yA1zkHG3gjVqbb9lqbSwVlz5qBL100jd3qkRo0')

exports.payment = async (req, res) => {

    //code
    try {
        //req.user.id
        console.log('test',req.user.id)
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: req.user.id 
            } 
        })
        const amountTHB = cart.cartTotal * 100
        

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            //จำนวนเงิน เป็น สตางค์
            amount: amountTHB,
            currency: "thb",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}