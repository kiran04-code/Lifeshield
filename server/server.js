import express from "express"
import { config } from "dotenv"
import { DBonnection } from "./config/dbConnection.js";
import UserRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";
import { authUserDocter } from "./middleware/Dock.js";
import { authUser } from "./middleware/user.js";
import DocterRoutes from "./routes/Docter.js";
import hostpitalRoutes from "./routes/HostpitalRoutes.js";
import BookingRoutes from "./routes/BookingSlot.js";
import hostpitaWorkSpace from "./routes/HostWokSpace.js";
import Razorpay from "razorpay"
import meeetingRoutes from "./routes/MeetingBooking.js";
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
// Create teh Instance of Razorpay 
export const instance = new Razorpay({
    key_secret:process.env.RAZORPAY_SCREATE_KEY,
    key_id:process.env.RAZORPAY_API_KEY ,
     headers: {
    "X-Razorpay-Account": "Qm9HxV8IzX6RcB"
  }
})
DBonnection(process.env.MONGO_URL).then(()=>{
    console.log("MONGODB IS CONNECTED!")
}).catch((ERR)=>{
    console.log("ERROR",ERR)
})
app.use("/api",UserRoutes)
app.use("/api",DocterRoutes)
app.use("/api",hostpitalRoutes)
app.use("/api",hostpitaWorkSpace)
app.use("/api",BookingRoutes)
app.use("/api",meeetingRoutes)
app.get("/api/user",(req,res)=>{
    res.json({
        sucess:true,
        data:req.user
    })
})
app.get("/api/apikeyRazorpay",(req,res)=>{
   return  res.status(200).json({
     key:process.env.RAZORPAY_API_KEY
    })
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is Running On Port http://localhost:${PORT}`)
})