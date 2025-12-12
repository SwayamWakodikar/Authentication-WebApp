import {Request, Response, Router} from "express";
import { handleUserSignUp, handleUserLogin } from "../controllers/authController.js"; 
import passport from 'passport'; 

const router =Router();
router.post('/signup',handleUserSignUp);
router.post('/login', handleUserLogin);
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
    passport.authenticate('google', { 
        successRedirect: 'http://localhost:5173/dashboard', 
        failureRedirect: 'http://localhost:5173/login'    
    })
);

router.get('/',(req:Request,res:Response)=>{
    res.send("Authentication Route Works")
})
export default router;