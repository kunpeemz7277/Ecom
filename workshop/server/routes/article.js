const express = require('express')
const router = express.Router()

//Controllers
const { create } = require('../controllers/article')
const { authCheck, adminCheck} = require('../middlewares/authCheck')

//@ENDPOINT http://localhost:5001/api/article
router.post('/article',authCheck,adminCheck,create)
router.get('/article/:count')//อ่านสินค้าหลายชนิด
router.get('/article/:id')//อ่านสินค้าชนิดเดียว
router.get('/article/detail/:id')//อ่านสินค้าชนิดเดียว
router.put('/article/:id')
router.delete('/article/:id')
router.post('/article/search/filters')


router.post('/images')
router.post('/removeimages')


module.exports = router