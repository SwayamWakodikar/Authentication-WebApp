import userModel from "../model/user";
import {model} from "mongoose";
import { Request,Response } from "express";
async function handleUserSignUp (req :Request,res  :Response){
    const {name,email,password}=req.body as unknown as { name: string, email: string, password: string };
    const User=model('User',userModel);
    try{
        const user=new User({
            name:String,
            email:String,
            password:String
        })
    }
    catch(err){

    }
}