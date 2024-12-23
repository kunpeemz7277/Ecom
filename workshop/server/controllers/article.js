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
        const { title, content, images } = req.body
        const articles = await prisma.articles.create({
            data: {
                title: title,
                content: content,
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

        res.send(articles)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


exports.createImagesArticle = async (req, res) => {
    try {
        //code
        console.log(req.body)
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `ArticleTreez-${Date.now()}`,
            resource_type: 'auto',
            folder: 'Article'
        })
        res.send(result)
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}