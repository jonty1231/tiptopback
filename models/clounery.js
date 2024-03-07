import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: 'dbzijylgt', 
    api_key: '919169397167264', 
    api_secret: '7sakAExcefJdioU2HHUFec0Nbhw' 
});


 export  const cloudnaryupload =async(filetoupload)=>{
   try {
    if(!filetoupload) return null;
     const response =await cloudinary.uploader.upload(filetoupload,{
        resource_type:"auto"
    })
    return response;

   } catch (error) {
          fs.unlinkSync(filetoupload)
          return null;
   }
   

}
export const cloudnerydelete=async(cloudid)=>{
    try {
        if(!cloudid) return null;
        await cloudinary.uploader.destroy(cloudid)
    } catch (error) {
        fs.unlinkSync(filetoupload)
          return null;
    }
}