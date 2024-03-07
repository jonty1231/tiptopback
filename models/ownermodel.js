import mongoose from 'mongoose'

const ownerschema= mongoose.Schema({
email:{
type:String,
required:true
},
password:{
    type:String,
    required:true,
    min:[6,'please enter more then 6 characters'],
    max:[23,'too many characters']
}

},{timestamps:true})

const owner=  mongoose.model("owner",ownerschema)
export default owner;