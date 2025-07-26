import express from "express";
import { createWrokSpace } from "../controller/hostWokSpace.js";
const hostpitaWorkSpace = express.Router()
hostpitaWorkSpace.post("/createWrokSpace",createWrokSpace)

export default hostpitaWorkSpace