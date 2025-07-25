import express from "express";
import { docterhostpital, hostRgisters } from "../controller/hostRgister.js";
const hostpitalRoutes = express.Router()
hostpitalRoutes.post("/HostkRegister",hostRgisters)
hostpitalRoutes.get("/docterhostpital",docterhostpital)

export default hostpitalRoutes