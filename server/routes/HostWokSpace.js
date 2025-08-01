import express from "express";
import { createTHePackage, createWrokSpace, deletePackage, findAllHostpital, findHostpitalAndBakeVrfy, getResterData, startCunstacyService, upadeteHostbookingTime } from "../controller/hostWokSpace.js";
const hostpitaWorkSpace = express.Router()
hostpitaWorkSpace.post("/createWrokSpace", createWrokSpace)
hostpitaWorkSpace.get("/getResterData", getResterData)
hostpitaWorkSpace.get("/findAllHostpital", findAllHostpital)
hostpitaWorkSpace.post("/addtime", upadeteHostbookingTime)
hostpitaWorkSpace.post("/makeVerify", findHostpitalAndBakeVrfy)
hostpitaWorkSpace.post("/startCunstacyService", startCunstacyService)
hostpitaWorkSpace.post("/createPackage", createTHePackage)
hostpitaWorkSpace.post("/deletePackage", deletePackage)

export default hostpitaWorkSpace