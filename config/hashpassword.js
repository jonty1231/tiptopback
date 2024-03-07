import bcrypt from 'bcrypt'

const hashing=async(password)=>{
    const hashpassword=await bcrypt.hash(password,10)
    return hashpassword;
}
const comparepassword=async(password,hashpassword)=>{
    const compairpassword= await bcrypt.compare(password,hashpassword)
    return compairpassword
}
export {hashing,comparepassword}