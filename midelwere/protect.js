
import { varifytoken } from "../config/token.js";
import owner from "../models/ownermodel.js";




 const protect=async(req,res,next)=>{
const token= await req.cookies.token;
if(!token){
    return res.status(400).json({
        success:false, })
      
      
}
const varify=await varifytoken(token);

if(!varify){
    res.status(400).json({
        success:false, })
}

const user= await owner.findById(varify._id).select("-password")
if(!user){
    res.status(400).json({message:false})
}else{
    
    req.user=user;
}

next()
 }
 export default protect