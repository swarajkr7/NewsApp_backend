const express=require("express")
const {NewsModel}=require("../models/News.model")
const newsRouter=express.Router()


newsRouter.get("/singleArticle/:id",async(req,res)=>{
    const id=req.params.id;
    res.send(await NewsModel.find({"_id":id}))
})

newsRouter.get("/",async(req,res)=>{
    res.send(await NewsModel.find())
})

newsRouter.get("/:id",async(req,res)=>{
    const id=req.params.id
    console.log("Sab theek hai")
    res.send(await NewsModel.find({"authorID":id}) )
})
 

newsRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const new_news=new NewsModel(payload)
        await new_news.save()
        res.send("Created the news")
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
    
})

newsRouter.patch("/update/:id",async(req,res)=>{
    console.log("Update wala section call to ho raha hai")
    const payload=req.body
    const id=req.params.id
    const news=await NewsModel.findOne({"_id":id})
    const authorID_in_news=news.authorID
    const authorID_making_req=req.body.authorID
    try{
        if(authorID_making_req!==authorID_in_news){
            console.log(news)
            res.send({"msg":"You are not authorized"})
        }else{
            await NewsModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the news")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

newsRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const news=await NewsModel.findOne({"_id":id})
    const authorID_in_news=news.authorID
    const authorID_making_req=req.body.authorID
    try{
        if(authorID_making_req!==authorID_in_news){
            console.log(news)
            res.send({"msg":"You are not authorized"})
        }else{
            await NewsModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the news")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})


newsRouter.delete("/Adelete/:id",async(req,res)=>{
    const id=req.params.id
    console.log("dono delete hoga")
    try{
            await NewsModel.findByIdAndDelete({"authorID":id})
            res.send("Deleted the news")
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    newsRouter
}