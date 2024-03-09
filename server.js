import express from 'express';
import dotenv from "dotenv"
import ownerroute from './routers/ownerRouter.js'
import mongoose from 'mongoose';
import cookiparser from "cookie-parser";
import cors from 'cors';
import productroute from "./routers/productrouter.js"
import userrouter from "./routers/userrouters.js";
dotenv.config()



const app=express();
app.use(express.json());
app.use(cors({
   origin:"https://tiptopfashion.netlify.app",
    credentials:true
}));


app.use(cookiparser());
app.get("/",(req,res)=>{res.json({go:"go"})})

app.use('/',ownerroute)
app.use("/",productroute)
app.use("/user",userrouter)



 const PORT=process.env.PORT || 8000
 
 mongoose
 .connect(process.env.MONGO_URI)
 .then(()=>{
    app.listen(PORT,()=>{
        console.log(PORT)
    })
 })
