import mongoose from "mongoose";
import {model} from "mongoose";
const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
    }
},{
    timestamps:true
})
export default userModel;