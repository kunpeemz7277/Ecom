const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    //code

    //ถ้าโค้ดที่เขียนใน try เกิด error ให้เข้าใน catch ทั้งหมด
    try {
        const { email, password } = req.body
        //Step 1 Validate body
        if (!email) {
            return res.status(400).json({ message: "Email is required!!!" })
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required!!!" })
        }
        // if (password < 8) {
        //     return res.status(400).json({ message: "Please input a password greater than 8 to 16 !!!" })
        // }
        //if(!email || !password){
        //
        //    return res.status(400).json({ message: "Please Check Input desciption!!!"})
        //}

        //Step 2 Check Email in DB already ?
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        //ถ้า Email สมบูรณ์ไม่ต้องทำเงื่อนไขข้างล่างแล้ว
        if (user) {
            return res.status(400).json({ message: "Email already exits!!" })
        }

        //Step 3 HashPassword 
        const hashPassword = await bcrypt.hash(password, 10)


        //Step 4 Register
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })


        res.send('Register Success')
    } catch (err) {
        // err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req, res) => {
    //code

    //ถ้าโค้ดที่เขียนใน try เกิด error ให้เข้าใน catch ทั้งหมด
    try {
        const { email, password } = req.body
        //Step 1 CheckEmail
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        //ถ้าไม่มีชื่อผู้ใช้ หรือ ผู้ใช้ไม่ได้เปิด จะจบที่ตรงนี้
        if(!user || !user.enabled){
            return res.status(400).json({
                message : 'User Not found or not Enabled'
            })
        }
        
        //Step 2 Check password
        //เราเข้ารหัสด้วย bcrypt จะต้องถอดด้วย compare 
        const isMatch = await bcrypt.compare(password, user.password)
        //ถ้ารหัสผ่านไม่ตรงหรือไม่ใส่ มันไม่ตรงก็จบที่บรรทัดนี้
        if(!isMatch){
            return res.status(400).json({
                message : "Password Invalid!!"
            })
        }
        
        //Step 3 Create Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        //Step 4 Generate Token
        //อยู่หน้า .env
        //expiresIn คือ อายุของ Token ว่าอยากให้นานเท่าไหร่
        jwt.sign(payload,process.env.SECRET,{
            expiresIn:'1d'
        },(err,token)=>{
            if(err){
                return res.status(500).json({
                    message: "Server Error"
                })
            }
            res.json({
                payload,token
            })
        })

    } catch (err) {
        // err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.currentUser = async (req, res) => {
    //code 

    //ถ้าโค้ดที่เขียนใน try เกิด error ให้เข้าใน catch ทั้งหมด
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id:true,
                email:true,
                name:true,
                role:true
            }
        })
        res.json({ user })
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }

}



