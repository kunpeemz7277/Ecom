const prisma = require("../config/prisma")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUND_NAME,
    api_key: process.env.ClOUDINARY_API_KEY,
    api_secret: process.env.ClOUDINARY_API_SECRET
});


exports.create = async (req, res) => {

    //code 
    try {

        const { title, description, price, quantity, categoryId, images } = req.body
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    //.map คือ many
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })

        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


exports.list = async (req, res) => {

    //code 
    try {
        const { count } = req.params
        const products = await prisma.product.findMany({
            //จำนวนที่ต้องการ
            take: parseInt(count),
            //เรียงตามจาก มาก ไป น้อย
            orderBy: { createdAt: "desc" },
            //include(รวมถึง) คือ การ join ตารางเข้ามา
            include: {
                category: true,
                images: true
            },
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.read = async (req, res) => {

    //code 
    try {
        const { id } = req.params
        const products = await prisma.product.findFirst({
            //จำนวนที่ต้องการ
            where: {
                id: Number(id)
            },
            //include(รวมถึง) คือ การ join ตารางเข้ามา
            include: {
                category: true,
                images: true
            },
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.update = async (req, res) => {

    //code 
    try {

        const { title, description, price, quantity, categoryId, images } = req.body

        // clear 
        await prisma.image.deleteMany({
            where: {
                productId: Number(req.params.id)
            }
        })

        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    //.map คือ many
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })

        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.remove = async (req, res) => {

    //code 
    try {
        //code
        const { id } = req.params

        //หนังชีวิต เพราะ รูปอยู่บน cloud ด้วย
        //Step 1 ค้นหาสินค้า include images(เข้าถึงรูป)
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                images: true
            }
        })
        if (!product) {
            return res.status(400).json({ message: 'Product not found' })
        }
        console.log(product)
        //Step 2 Promise ลบรูปภาพใน cloud ลบแบบ รอฉันด้วย
        const deleteImage = product.images.map((image) =>
            new Promise((resolve,reject) => {
                //ลบจาก clouddinary
                cloudinary.uploader.destroy(image.public_id,(error,result)=>{
                    if(error) reject(error)
                        else resolve(result)
                })
            })
        )
        await Promise.all(deleteImage)

        //Step 3 ลบสินค้า
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        res.send('Delete Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

//ให้สินค้าเรียงตามอะไร
exports.listby = async (req, res) => {

    //code 
    try {
        const { sort, order, limit } = req.body
        console.log(sort, order, limit)
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: { 
                category: true,
                images:true, 
            }
        })

        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


const handleQuery = async (req, res, query) => {

    //code
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error" })
    }
}

const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                //gte คือ มากกว่า lte คือ น้อยกว่าค่ามากสุด
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                },
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                //gte คือ มากกว่า lte คือ น้อยกว่าค่ามากสุด
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.searchFliters = async (req, res) => {

    //code 
    try {
        const { query, category, price } = req.body

        if (query) {
            console.log('query-->', query)
            await handleQuery(req, res, query)
        }

        if (category) {
            console.log('category-->', category)
            await handleCategory(req, res, category)
        }

        if (price) {
            console.log('price-->', price)
            await handlePrice(req, res, price)
        }

        //res.send('Hello searchFilters Product')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


exports.createImages = async (req, res) => {
    try {
        //code
        console.log(req.body)
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `Treez-${Date.now()}`,
            resource_type: 'auto',
            folder: 'Ecom2024'
        })
        res.send(result)
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.removeImage = async (req, res) => {
    try {
        //code
        const { public_id } = req.body
        //console.log(public_id)
        cloudinary.uploader.destroy(public_id, (result) => {
            res.send('Remove Image Success!!!')
        })

    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}