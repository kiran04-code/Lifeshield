import express from "express";
import { Auth, login, logout, signup,verify} from "../controller/user.js";


const UserRoutes = express.Router()
UserRoutes.post("/Signup",signup)
UserRoutes.post("/signin",login)
UserRoutes.post("/vrfy",verify)
UserRoutes.get("/Auth",Auth)
UserRoutes.get("/logout",logout)

export default UserRoutes