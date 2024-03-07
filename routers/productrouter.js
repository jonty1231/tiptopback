import express from 'express';
import protect from '../midelwere/protect.js';
import { getuser ,addProduct,getproduct,deleteproduct,homeproduct,topwere,lowerwere,shoeswere} from '../controllers/productcontroller.js';
import { singleupload } from '../midelwere/uploadimg.js';




const router=express.Router();

router.post('/product',protect,singleupload, addProduct)
router.get("/getproduct",protect,getproduct)
router.get("/getuser",protect,getuser)
router.delete("/getuser/:id",protect,deleteproduct)
router.get('/product',homeproduct)
router.get('/top',topwere)
router.get('/lower',lowerwere)
router.get('/shoes',shoeswere)
 



export default router;