import {Request, Response, Router} from "express";
import { handleUserSignUp } from "../controllers/authController.js";
const router =Router();

router.post('/signup',handleUserSignUp);
router.get('/',(req:Request,res:Response)=>{
    res.send("Authentication Route Works")
})
export default router;