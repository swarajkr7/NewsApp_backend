const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{  
    const token=req.headers.authorization
    console.log(token)
    if(token){
        const decoded=jwt.verify(token,"news")
        if(decoded){
            const authorID=decoded.authorID
            console.log(decoded)
            req.body.authorID=authorID
            console.log("YAHA SAB THEEK HAI")
            next()
        }else{
            res.send("Please login First")
        }
    }else{
        res.send("Please Login First")
    }
}

module.exports={
    authenticate
}

