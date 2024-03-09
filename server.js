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
   origin:"b7134f95-cc04-4518-9e50-82abf99c4cb1",
    credentials:true
}));


app.use(cookiparser());
app.use('/',ownerroute)
app.use("/",productroute)
app.use("/user",userrouter)



 const PORT=process.env.PORT || 8000
app.use("/",(req,res)=>{res.json({PORT})
 
 mongoose
 .connect(process.env.MONGO_URI)
 .then(()=>{
    app.listen(PORT,()=>{
        console.log(PORT)
    })
 })
