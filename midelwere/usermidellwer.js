import { varifytoken } from "../config/token.js"
import User from "../models/usermodel.js";




  export const userprotect=async (req,res,next)=>{
try {
    const token=await req.cookies.usertoken;
    if(!token){
        return res.status(404).json( {
            success:false,
            message:"user not found"
        })}

    const {_id}=await varifytoken(token)
    const user=await User.findById({_id}).select("-password")
     if(user){
        req.user=user;
        next()
     }

} catch (error) {
    res.status(404).json( {
        success:false,
        message:"user not found"
    })
}

}