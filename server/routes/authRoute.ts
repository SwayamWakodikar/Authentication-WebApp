import {Request, Response, Router} from "express";
import { handleUserSignUp } from "../controllers/authController.js";
import passport from "passport";
const router =Router();

router.post('/signup',handleUserSignUp);//for manaul email and password

router.get('/get',passport.authenticate('google',{//to send user to google login page
    scope:['profile','email']
}));

router.get('/google/callback',passport.authenticate('google',{
    successRedirect: 'http://localhost:5173/dashboard',//dummy links until frontend is made
    failureRedirect: 'http://localhost:5173/login'
}));

router.get('/',(req:Request,res:Response)=>{
    res.send("Authentication Route Works")
});
export default router;