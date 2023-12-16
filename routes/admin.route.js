const express=require("express")

const adminRouter=express.Router()


adminRouter.post("/create",(req,res)=>{
    

})

adminRouter.put("/update",(req,res)=>{
    res.send("Updated")

})

adminRouter.delete("/delete",(req,res)=>{
    res.send("Deleted")

})

module.exports={
    adminRouter
}

