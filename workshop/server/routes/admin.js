//import ....
const express = require('express')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

//import controllers
const { getOrderAdmin, changeOrderStatus } = require('../controllers/admin')


// ENDPOINT http://localhost:5001/api/register
router.put('/admin/order-status',authCheck ,changeOrderStatus)
router.get('/admin/orders',authCheck, getOrderAdmin)



module.exports = router