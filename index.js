const express = require("express");
const { connection } = require("./configs/db");
const { authorRouter } = require("./routes/author.routes");
const { newsRouter } = require("./routes/news.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
require("dotenv").config()

var cors = require('cors');



const app = express();
app.use(cors())
app.use(express.json());



app.use("/authors",authorRouter);
app.use(authenticate);
app.use("/news",newsRouter)


app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected to the DB");
    }catch(err){
        console.log("Trouble connecting to the DB");
        console.log(err);
    }
    console.log("Server is running at port 9999")
});
