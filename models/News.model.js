const mongoose=require("mongoose")

const newsSchema=mongoose.Schema({
    author:String,
    date:String,
    category:String,
    title:String,
    img_link:String,
    content:String,
    authorID:String
})

const NewsModel=mongoose.model("news",newsSchema)

module.exports={
    NewsModel
}


