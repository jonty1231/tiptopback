import express from "express";
import { registeruser,loginuser,getuser,logoutuser, addcart,cartproduct,cartdelete,otpgenerat,checkOtp  } from "../controllers/usercontroller.js";
import { userprotect } from "../midelwere/usermidellwer.js";
 
const router = express.Router();

router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/logedin",userprotect,getuser)
router.get("/logoutuser",logoutuser)
router.get("/addcart/:id",userprotect,addcart)
router.get("/getcart",userprotect,cartproduct)
router.delete("/deletcart/:id",userprotect,cartdelete)
router.post("/sentotp",otpgenerat)
router.post("/checkotp",checkOtp)

export default router