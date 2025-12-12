import User from "../model/user.js";
import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
export async function handleUserLogin(req: Request, res: Response) {
    const { email, password } = req.body as { email: string, password: string };

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password!); 

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error("Passport login error:", err);
                return res.status(500).json({ message: 'Internal server error during login' });
            }
            return res.status(200).json({
                message: "Login successful!",
                user: { name: user.name, username: user.username, email: user.email }
            });
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error during login' });
    }
}
export async  function handleUserSignUp(req:Request,res:Response){
const { name, username, email, password } = req.body as {name: string,username:string,email: string,password:string};

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
            username:username,
            email: email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(201).json({
            message: "User created successfully!!!",
            user:{name: newUser.name,username:newUser.username,email: newUser.email
            }
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Server error during sign up '});

    }
}