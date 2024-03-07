import mongoose from 'mongoose';

const productschema= new mongoose.Schema({

name:{
    type:String,
    required:true,
},
oldprice:{
    type:Number,
    required:true,
},
price:{
    type:Number,
    required:true,  
},
category:{
    type:String,
    required:true,
},
photo:{
    url:{type:String},
     photoid:{type:String}
},
other:{
    type:String,
    default:"",
}


},{timestamps:true})
const product= mongoose.model('product',productschema)
export default product