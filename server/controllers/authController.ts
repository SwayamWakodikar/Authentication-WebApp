import User from "../model/user";
import { Request,Response } from "express";
async function handleUserSignUp (req :Request,res  :Response){
    const {name,email,password}=req.body as unknown as { name: string, email: string, password: string };
    try{
        await User.create({
            name,
            email,
            password,
        });
    }
    // catch(){

    // }
    
}