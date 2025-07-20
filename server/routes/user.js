import express from "express";
import { Auth, login, logout, signup,verify} from "../controller/user.js";


const UserRoutes = express.Router()
UserRoutes.post("/Signup",signup)
UserRoutes.get("/signin",login)
UserRoutes.get("/vrfy",verify)
UserRoutes.get("/Auth",Auth)
UserRoutes.get("/logout",logout)

export default UserRoutes