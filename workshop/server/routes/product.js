const express = require('express')
const router = express.Router()

//Controllers
const { create, list, read, update, remove, listby, searchFliters , createImages, removeImage} = require('../controllers/product')
const { authCheck, adminCheck} = require('../../server/middlewares/authCheck')

//@ENDPOINT http://localhost:5001/api/products
router.post('/product',create)
router.get('/products/:count',list)//อ่านสินค้าหลายชนิด
router.get('/product/:id',read)//อ่านสินค้าชนิดเดียว
router.get('/shop/detail/:id',read)//อ่านสินค้าชนิดเดียว
router.put('/product/:id',update)
router.delete('/product/:id',remove)
router.post('/productby',listby)
router.post('/search/filters',searchFliters)


router.post('/images', authCheck, adminCheck, createImages)
router.post('/removeimages', authCheck, adminCheck, removeImage)



module.exports = router