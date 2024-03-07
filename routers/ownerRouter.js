import express from "express";
import {ownercontroler,logout} from "../controllers/ownercontroller.js";


const router=express.Router();

router.post("/owner",ownercontroler)
router.get("/logout",logout)

export default router

