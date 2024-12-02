//step 1 Import....
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors' )

//const authRouter = require('./routes/auth')
//const categoryRouter = require('./routes/category')



//middleware จะ log ค่าออกมา
app.use(morgan('dev'))

//ใช้อ่าน flie JSON
app.use(express.json({ limit:'20mb' }))
app.use(cors())

//app.use('/api',authRouter)
//app.use('/api',categoryRouter)



//.map คือ การ loop เข้าไปใน array เพื่อลดการประกาศ api หลายๆตัว ตรงบรรทัด 18,19
readdirSync('./routes')
.map((c)=> app.use('/api',require('./routes/'+c)) )



//ใช้เช็คชื่อไฟล์
//console.log(readdirSync('./routes'))



//Step 3 Router
//app.post('/api', (req,res)=>{
//    //code
//    const { username,password } = req.body
//    console.log(username,password)
//    res.send('Natdanai 555+')
//})

//Step 2 Start Sever
app.listen(5001, 
    ()=> console.log('Sever is running on port 5001'))