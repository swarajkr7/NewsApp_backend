const express=require("express")
const {AuthorModel}=require("../models/Author.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const authorRouter=express.Router()

authorRouter.get("/",async(req,res)=>{
    res.send(await AuthorModel.find())
})


authorRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body
    try{
        bcrypt.hash(pass, 5, async (err, secure_password)=> {
            if(err){
                console.log(err)
            }else{
                const author = new AuthorModel({email,pass:secure_password,name,age})
                await author.save()
                res.send("Registered")
            }
        }); 
    }catch(err){
        res.send("Error in registering the author")
        console.log(err)
    }
});

authorRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
       const author=await AuthorModel.find({email})
       if(author.length>0){
        bcrypt.compare(pass, author[0].pass, function(err, result) {
            if(result){
                const token = jwt.sign({authorID:author[0]._id}, "news");
                res.send({"msg":"Login Successfull","token":token,"authorID":author[0]._id,"name":author[0].name}) 
            }else{
                res.send("Wrong Credentials")
            }
        });
       }else {
        res.send("Wrong Credentials")
       }
    }catch(err){
       res.send("Something went wrong")
       console.log(err)
    }
})

authorRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    console.log("iiiiddd:",id)
    try{
        await AuthorModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the news")
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})





module.exports={
    authorRouter
} 









