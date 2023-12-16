const mongoose=require("mongoose")

const authorSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number,
})

const AuthorModel=mongoose.model("author",authorSchema)

module.exports={
    AuthorModel
}