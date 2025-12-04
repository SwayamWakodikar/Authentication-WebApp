import express,{Request,Response} from "express";
import router from "./routes/authRoute";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute"

dotenv.config();
const app=express();
const PORT=process.env.PORT|| 5000;
//add MONGOURI after db integration
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req:Request,res:Response)=>{
    res.send("HEllo Guyz");
})
app.use("/api/auth",authRoute);

app.listen((PORT),()=>{
    console.log(`Server Runing on ${PORT}`);
})