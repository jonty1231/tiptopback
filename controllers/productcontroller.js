

// import product from "../models/productmodel.js"

import { getdatauri } from "../midelwere/uploadimg.js"
import { cloudnaryupload,cloudnerydelete } from "../models/clounery.js"
import product from "../models/productmodel.js"

 

const getuser=async(req,res)=>{
const user=req.user
if(user){
   res.status(200).json({
    success:true,
    data:user
   }) 
} else{
    res.status(500).json({
        success:false
    })
}

}
export {getuser}


export const addProduct=async (req,res)=>{
    try {
      const photo= req.file;
      const {name,oldprice,price,other,category}=req.body
     

   const fileuri=getdatauri(photo)
   
     const imgdata=await cloudnaryupload(fileuri.content)
      await product.create({name,oldprice,price,other,category,photo:{url:imgdata.secure_url,photoid:imgdata.public_id}})
  
      
      res.status(200).json({
            success:"wait",
       
           })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }}




export const getproduct= async (req,res)=>{
    try {
        const owner =req.user;
        if(!owner){
            return res.status(404).json({success:false,message:"login first"})
        }
       const allproduct=await product.find({});
      res.status(200).json(allproduct)

    } catch (error) {
        return res.status(500).json({success:false,message:"login first"})
        
    }
}

export const deleteproduct = async(req,res)=>{
    try {
        const {id}=req.params
        const Product =await product.findByIdAndDelete({_id:id})

        if(!id || Product){
            return res.status(404).json({success:false,message:"not delete"})
        }
        
        await cloudnerydelete(Product.photo.photoid)
            
        res.status(200).json({success:true,message:" delete"})

    } catch (error) {
         res.status(500).json({success:false,message:error.message})
        
    }
}

export const homeproduct=async(req,res)=>{
    try {
        const allproduct= await product.find({});
        res.status(200).json({
            allproduct
        })
        
    } catch (error) {
        res.status(500).json({
           success:false
        })
    }
}
export const topwere= async (req,res)=>{
    try {
     const top=await product.find({category:'top'})  
     res.status(200).json({
        top
     }) 
    } catch (error) {
        res.status(200).json({
            success:false,
            message:error.message
         })  
    }
}

export const lowerwere= async (req,res)=>{
    try {
     const lower=await product.find({category:'lower'})  
     res.status(200).json({
        lower
     }) 
    } catch (error) {
        res.status(200).json({
            success:false,
            message:error.message
         })  
    }
}


export const shoeswere= async (req,res)=>{
    try {
     const shoes=await product.find({category:'shoes'})  
     res.status(200).json({
        shoes
     }) 
    } catch (error) {
        res.status(200).json({
            success:false,
            message:error.message
         })  
    }
}

