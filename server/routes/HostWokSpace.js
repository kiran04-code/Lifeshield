import express from "express";
import { createWrokSpace, findAllHostpital, getResterData } from "../controller/hostWokSpace.js";
const hostpitaWorkSpace = express.Router()
hostpitaWorkSpace.post("/createWrokSpace",createWrokSpace)
hostpitaWorkSpace.get("/getResterData",getResterData)
hostpitaWorkSpace.get("/findAllHostpital",findAllHostpital)

export default hostpitaWorkSpace