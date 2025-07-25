import express from "express";
import { hostRgisters } from "../controller/hostRgister.js";
const hostpitalRoutes = express.Router()
hostpitalRoutes.post("/HostkRegister",hostRgisters)

export default hostpitalRoutes