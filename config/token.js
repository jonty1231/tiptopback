import jwt from "jsonwebtoken";



const ownertoken=  (id)=>{
                    
    const token= jwt.sign({_id:id},process.env.JWT_ID,{ expiresIn:"10d" })
    return token;
}

 export const varifytoken= (token)=>{
    const veryt= jwt.verify( token ,process.env.JWT_ID)
    return veryt
}
export default ownertoken
