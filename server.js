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
   origin:"7386db9d-7840-4e3f-951d-96b7fabd0988",
    credentials:true
}));


app.use(cookiparser());
app.use("/",(req,res)=>{res.send("done site")})
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
