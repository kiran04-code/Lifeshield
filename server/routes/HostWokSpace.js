import express from "express";
import { createWrokSpace, findAllHostpital, findHostpitalAndBakeVrfy, getResterData, upadeteHostbookingTime } from "../controller/hostWokSpace.js";
const hostpitaWorkSpace = express.Router()
hostpitaWorkSpace.post("/createWrokSpace",createWrokSpace)
hostpitaWorkSpace.get("/getResterData",getResterData)
hostpitaWorkSpace.get("/findAllHostpital",findAllHostpital)
hostpitaWorkSpace.post("/addtime",upadeteHostbookingTime)
hostpitaWorkSpace.post("/makeVerify",findHostpitalAndBakeVrfy)

export default hostpitaWorkSpace