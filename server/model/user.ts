import mongoose from "mongoose";
import { model } from "mongoose";
const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false, // <--- CHANGE: set to false to allow Google sign-in
    },
    googleId: { // <--- ADD THIS FIELD: to store Google's unique ID
        type: String,
        required: false,
        unique: true,
        sparse: true // <--- Add sparse index to allow multiple null values
    },
    profileImage: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})
const User = mongoose.model('User', userModel);
export default User;