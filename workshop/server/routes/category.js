//import ....
const express = require('express')
const router = express.Router()

//import controllers
const { createcty , list , remove} = require('../controllers/category')
const { authCheck , adminCheck } = require('../middlewares/authCheck')

// ENDPOINT http://localhost:5001/api/category
router.post('/category', authCheck, adminCheck, createcty)
router.get('/category', list)
router.delete('/category/:id', authCheck, adminCheck, remove)

//exports
module.exports = router