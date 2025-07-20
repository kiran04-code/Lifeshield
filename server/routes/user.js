import express from "express";
import { login, logout, signup,verify} from "../controller/user.js";


const UserRoutes = express.Router()
UserRoutes.post("/Signup",signup)
UserRoutes.get("/signin",login)
UserRoutes.get("/vrfy",verify)
UserRoutes.get("/logout",logout)

export default UserRoutes