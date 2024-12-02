//import ....
const express = require('express')
const router = express.Router()

//import controllers
const { register, login, currentUser } = require('../controllers/auth')
//import Middleware
const { authCheck, adminCheck } = require('../middlewares/authCheck')


// ENDPOINT http://localhost:5001/api/register
router.post('/register',register)
router.post('/login',login)
//ใช้ในการเช็คหน้าบ้านว่าคุณ login แล้วหรือยัง 
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck, adminCheck, currentUser)



module.exports = router