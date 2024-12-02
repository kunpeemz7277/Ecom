const prisma = require("../config/prisma")

exports.listUsers = async (req, res) => {

    //code
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true,
                updatedAt: true
            }
        })
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.changeStatus = async (req, res) => {

    //code
    try {
        const { id, enabled } = req.body
        console.log(id, enabled)
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                enabled: enabled
            }
        })


        res.send('Update Status Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body
        console.log(id, role)
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                role: role
            }
        })


        res.send('Update Role Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.userCart = async (req, res) => {
    try {

        const { cart } = req.body
        console.log(cart)
        console.log(req.user.id)

        const user = await prisma.user.findFirst({
            where: {
                id: Number(req.user.id)
            }
        })
        //console.log(user)

        // Check quantity ใช้ for loop จาก userCart.products
        for (const item of cart) {
            //console.log(item)
            //ใช้ findUnique เพื่อค้นหา
            const product = await prisma.product.findUnique({
                where: {
                    id: item.id
                },
                select: {
                    quantity: true, title: true
                }
            })
            //console.log(item)
            //console.log(product)
            //ถ้าไม่มี product หรือ จำนวนที่ซิ้อมีมากกว่าสินค้าในสต๊อกปัจจุบัน product.quantity
            if (!product || item.count > product.quantity) {
                return res.status(400).json({
                    ok: false,
                    message: `ขออภัย. สินค้า ${product?.title || 'product'} หมด`
                })
            }
        }

        ////////////////////////////////////
        //สั่ง clean ข้อมูลเดิม

        // Delete old Cart item
        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderedById: user.id
                }
            }
        })
        // Deleted old Cart
        await prisma.cart.deleteMany({
            where: {
                orderedById: user.id
            }
        })

        ////////////////////////////////////

        //เตรียมสินค้า
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price
        })
        )


        //หาผลรวม sum คือ ค่าก่อน กับ item คือ ค่าปัจจุบัน
        let cartTotal = products.reduce((sum, item) =>
            sum + item.price * item.count, 0
        )

        console.log(cartTotal)

        //New cart
        const newCart = await prisma.cart.create({
            data: {
                products: {
                    create: products
                },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })

        console.log(newCart)
        res.send('Add Cart Ok')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


//ยาก
exports.getUserCart = async (req, res) => {
    //code

    try {

        //req.user.id วิ่งไปทุกๆหน้าอยู่แล้ว ต้องผ่าน middlewares ถึงจะมีให้ใช้
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: Number(req.user.id)
            },
            include: {
                //products คือ ProductOnCart ใน (model Cart)
                products: {
                    include: {
                        //product คือ product ใน (model ProductOnCart)
                        product: true
                    }
                }
            }
        })
        //console.log(cart)
        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.emptyCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { orderedById: Number(req.user.id) }
        })
        if (!cart) {
            return res.status(400).json({ message: 'No cart' })
        }
        await prisma.productOnCart.deleteMany({
            where: { cartId: cart.id }
        })
        const result = await prisma.cart.deleteMany({
            where: { orderedById: Number(req.user.id) }
        })

        console.log(result)
        res.json({
            message: 'Cart Empty Success',
            deletedCount: result.count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.saveAddress = async (req, res) => {
    try {

        const { address } = req.body
        console.log(address)
        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: {
                address: address
            }
        })

        res.json({ ok: true, message: 'Address update success' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


//แม่งโครตยาก ของ ยากที่สุด
exports.saveOrder = async (req, res) => {
    try {
        //Step 0 Check Stripe
        // console.log(req.body)
        // return res.send('hello I Kuy')
        // stripePaymentId String
        // amount          Int
        // status          String
        // currentcy       String
        const { id,amount, status, currency } = req.body.paymentIntent

        //Step 1 Get User Cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderById: {
                    id: Number(req.user.id)
                }
            },
            include: {
                products: true
            }
        })


        // Check Cart empty
        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({ ok: false, message: 'Cart is Empty' })
        }

        

        const amountTHB = Number(amount) / 100

        // Create a new Order

        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderBy: {
                    connect: { id: req.user.id }
                },
                cartTotal: userCart.cartTotal,
                stripePaymentId: userCart.cartTotal,
                stripePaymentId: id,
                amount: amountTHB,
                status: status,
                currentcy: currency,
            }
        })
        

        //Update Product
        const update = userCart.products.map((item) => ({
            where: {
                id: item.productId
            },
            data: {
                quantity: { decrement: item.count },
                sold: { increment: item.count }
            }
        }))


        console.log(update)

        await Promise.all(
            update.map((updated) => prisma.product.update(updated))
        )

        await prisma.cart.deleteMany({
            where: {
                orderedById: Number(req.user.id)
            }
        })

        res.json({ ok: true, order })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.getOrder = async (req, res) => {
    try {

        const orders = await prisma.order.findMany({
            where: {
                orderById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        if (orders.length === 0) {
            return res.status(400).json({ ok: false, message: 'No orders' })
        }

        res.json({ ok: true, orders })

        //console.log(orders)


        //res.send('Hello getOrder')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
