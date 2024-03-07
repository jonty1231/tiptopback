import { hashing ,comparepassword} from "../config/hashpassword.js";
import ownertoken from "../config/token.js";
import owner from "../models/ownermodel.js";

const ownercontroler= async(req,res)=>{
   try {
    const {email,password}=req.body;
    
if(!email || !password){
    res.status(400)
    throw new Error("please enter info")
}
if(password.length<6){
    res.status(400)
    throw new Error('please enter more then 6 character')
} 

 
    const user=await owner.findOne({email})
    if(!user){ 
        res.status(400)
        throw new Error("enter a valid email")
    }
const newpassword= await comparepassword(password,user.password);
if(!newpassword){
    res.status(400)
    throw new Error("enter a valid password")
}


const id= await user._id.toString();
res.cookie('token',ownertoken(id),{
    path:'/',
  httpOnly:true,
  expires: new Date(Date.now()+7000 *86400),
  sameSite:'none',
secure:true,
})
if(user || newpassword){
    const {_id,email}=user
    res.status(200).json({
        success:true,
         _id,email
    })}
    else{
        res.status(400)
        throw new Error("faild")
    }
 



   } catch (error) {
    res.status(400).json({error:error.message})
   }

}

const logout=async(req,res)=>{
    res.cookie('token',"",{
        path:'/',
  httpOnly:true,
  expires: new Date(Date.now()),
  sameSite:'none',
secure:true,
    })
    res.status(200).json({
        success:true,
        message:"logout"
    })
}

export { ownercontroler,logout}