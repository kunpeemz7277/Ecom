//import ....
const express = require('express')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()


//import controllers
const { payment } = require('../controllers/stripe')


// ENDPOINT http://localhost:5001/api/register
router.post('/user/create-payment-intent',authCheck,payment)




module.exports = router