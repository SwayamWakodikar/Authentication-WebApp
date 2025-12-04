import User from "../model/user";
import { Request,Response } from "express";
import bcrypt from "bcryptjs";

export async  function handleUserSignUp(req:Request,res:Response){
    const{name,email,password}=new req.body as unknown as {name: string,email: string,password:string};

    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: 'User with this email already exits.'});
        }
        //salt is a string that is added before the hash code 
        const salt=await bcrypt.genSalt(10);
        //.hash() convert the password into hash here
        const hashedPassword=await bcrypt.hash(password,salt);

        //creating and saving new User
        const newUser=new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(201).json({
            message: "User created successfully!!!",
            user:{name: newUser.name,email: newUser.email
            }
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error during sign up '});

    }
}