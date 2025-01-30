import express from "express"
import dotenv from "dotenv";
const app = express()
app.get("/",(req,res)=>{
    res.send("server has started ")
})
const PORT =  process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server has started at http://localhost:${PORT}`)
})