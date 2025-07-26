import express from "express";
import { createWrokSpace, getResterData } from "../controller/hostWokSpace.js";
const hostpitaWorkSpace = express.Router()
hostpitaWorkSpace.post("/createWrokSpace",createWrokSpace)
hostpitaWorkSpace.get("/getResterData",getResterData)

export default hostpitaWorkSpace