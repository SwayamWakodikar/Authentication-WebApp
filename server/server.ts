import express,{Express,Request,Response} from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js"
import mongoose from "mongoose"; // Import mongoose
// Import new packages
import passport from 'passport'; 
import session from 'express-session';

dotenv.config();
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; 
        if (!uri) {
            console.error("MONGO_URI is not defined in environment variables. Please check your .env file.");
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}
const startServer = () => {
    const app: Express = express();
    const PORT=process.env.PORT|| 5000;
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use(session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    // ----------------------------------------------


    app.get('/',(req:Request,res:Response)=>{
        res.send("HEllo Guyz");
    })
    app.use("/api/auth",authRoute);

    app.listen((PORT),()=>{
        console.log(`Server Runing on ${PORT}`);
    })
}

// ----------------------------------------------
// 3. Run Connection and Server
// ----------------------------------------------
connectDB().then(() => {
    startServer();
});