import express from "express"
import { config } from "dotenv"
import { DBonnection } from "./config/dbConnection.js";
import UserRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import { authUserDocter } from "./middleware/Dock.js";
import { authUser } from "./middleware/user.js";
import DocterRoutes from "./routes/Docter.js";
import cors from "cors"
config()
const app = express()
const allOrigins = [
  "http://localhost:5173",
  "https://lifeshield.onrender.com"
];

app.use(cors({
  origin: allOrigins,
  credentials: true
}));

app.use(cookieParser())
app.use(authUser("token_user"))
app.use(authUserDocter("Docter_user"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 3002;
app.get('/',(req,res)=>{
    res.send("Banked is Woking Good")
})
app.get("/docter/test",(req,res)=>{
 res.json({
    sucess:true,
    userData:req.docter
 })
})
DBonnection(process.env.MONGO_URL).then(()=>{
    console.log("MONGODB IS CONNECTED!")
}).catch((ERR)=>{
    console.log("ERROR",ERR)
})
app.use("/api",UserRoutes)
app.use("/api",DocterRoutes)
app.get("/api/user",(req,res)=>{
    res.json({
        sucess:true,
        data:req.user
    })
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is Running On Port http://localhost:${PORT}`)
})