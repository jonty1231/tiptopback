import { comparepassword, hashing } from "../config/hashpassword.js";
import ownertoken from "../config/token.js";
import Otpgen from "../models/otp.js";
import product from "../models/productmodel.js";
import { sendMail } from "../models/sendotp.js";
import User from "../models/usermodel.js";



 

export const otpgenerat=async(req,res)=>{
    try {
        const {email}=req.body
        if(!email){ res.status(200).json({success:false,message:"Enter email"})}
     const allreadyuser=await User.findOne({email})
     const otp= Math.floor(Math.random()*10000)
     if(allreadyuser){
        res.status(201).json({ success:false,message:"email allready exist"})
        return  } 
     else{
const alreadyotp = await Otpgen.findOne({email})
if(alreadyotp){
    await Otpgen.findOneAndDelete({email})
    await Otpgen.create({email,otp})
    sendMail(email,otp)
    res.status(201).json({ success:true,message:"otp sent",otp})

}
else{ 
    await Otpgen.create({email,otp})
    sendMail(email,otp)
    res.status(201).json({ success:true,message:"otp sent",otp})

}


     }

    } catch (error) {
        res.status(404).json({success:false,message:error.message})
    }
}

export const checkOtp=async(req,res)=>{
    try {
       const {otp,email}=req.body;
const checkemail=await Otpgen.findOne({email})
let date1=new Date(checkemail.createdAt)
let date2= new Date(Date.now())
let diff=date2.getMinutes() - date1.getMinutes()
    if(checkemail.otp==otp && diff < 10){
        await Otpgen.findByIdAndDelete({_id:checkemail._id})
    res.status(201).json({success:true,message:"correct otp"})

    }
    res.status(201).json({message:"Enter valide Otp"})

} catch (error) {
        
    }
}
 export const registeruser=async(req,res)=>{
    try {
        const {email,name,password}=req.body;
        if(!email || !name || !password){
            return res.status(404).json({
                success:false,
                message:"enter valid data"
            })}
            const verifyemail = await User.findOne({email})
            if(verifyemail){  return res.status(404).json({
                success:false,
                message:"email allready exist"
            })}
            const hashedpassword= await hashing(password)
       const user=await User.create({name,email,password:hashedpassword})     
              const id=await user._id.toString()
       res.cookie('usertoken',ownertoken(id),{
        path:'/',
        httpOnly:true,
        expires: new Date(Date.now()+7000 *86400*5),
        sameSite:'none',
      secure:true,
       })

       return res.status(201).json({
        success:true,
        message:'register'
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const loginuser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:'enter valid data'
            }) }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'enter valid email'
            })}
           const varifypassword = await comparepassword(password,user.password) ;
           if(!varifypassword){
            return res.status(500).json({
                success:false,
                message:'enter valid password'
            }) }
            const id= await user._id.toString()
        res.cookie('usertoken',ownertoken(id),{
            path:'/',
            httpOnly:true,
            expires: new Date(Date.now()+7000 *86400*5),
            sameSite:'none',
          secure:true,
        })    

        return res.status(201).json({
            success:true,
            message:'login'
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getuser =async(req,res)=>{
    try {
        const user=req.user;
        if(!user){
           return res.status(404).json( {
                success:false,
                message:"user not found"
            })}
         res.status(200).json({
            success:true,
            user
         })   
        
    } catch (error) {
        res.status(404).json( {
            success:false,
            message:error.message
        })  
    }
}

export const logoutuser =async (req,res)=>{
    try {
        res.cookie('usertoken','',{
            path:'/',
            httpOnly:true,
            expires:new Date(Date.now()*0),
        })
res.status(200).json({
    success:true,
    message:"logout success"
})
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const addcart=async(req,res)=>{
    try {
        const productid=req.params.id;
         const {_id}=req.user;
        
      if(!productid || !_id){
     return   res.status(404).json({
            success:false,
            message:"failed"
        })}
     const user=await User.findById(_id)
     if(user.cart.includes(productid)){
         return res.status(200).json({
          success:true,
            message:"Allready add"
        })
     }
     
   await user.cart.push(productid)
   await user.save()
res.status(200).json({
   success:true,
   message:"add to cart"
})

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const cartproduct=async(req,res)=>{
    try {
       const user=req.user;
       const cartproduct=await product.find({_id:{$in:user.cart}})
       res.status(200).json({
        success:true,
    cartproduct
       })
       
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
           })
    }
}

export const cartdelete=async(req,res)=>{
    try {
        const {id}= req.params;
        const {_id}=req.user;
        const user= await User.findById(_id)
        if(!id || !user){
            return res.status(404).json({
                success:false,
                message:"not delete"
            })}
            if(user.cart.includes(id)){
                const indexofcart= await user.cart.indexOf(id)
                  await user.cart.splice(indexofcart,1)
                  await user.save()
             return   res.status(200).json({
                   success:true,
                   message:'Remove from cart'
                })  
            }
    res.status(200).json({
        success:false,
        message:"item not add"
    })    


    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

