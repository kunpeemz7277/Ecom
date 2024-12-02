const prisma = require("../config/prisma")

exports.createcty = async (req,res) => {

    //code 
    try{
        const { name } = req.body
        const category = await prisma.category.create({
            data:{
                name: name
            }
        })

        res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.list = async (req,res) => {

    //code 
    try{
        const category = await prisma.category.findMany()
        res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}

exports.remove = async (req,res) => {

    //code 
    try{
        const { id } = req.params
        const category = await prisma.category.delete({
            where:{
                id: Number(id)
            }
        })
        res.send('Hello Category Remove')
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error"})
    }
}



