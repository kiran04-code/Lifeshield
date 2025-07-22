import express from "express"
import { authdoc, DocterCreateAccount, loginDoc, loginVrfy, SignVrfy } from "../controller/Docter.js"

const DocterRoutes = express.Router()
DocterRoutes.post("/Doclogin",DocterCreateAccount)
DocterRoutes.post("/SignVrfy",SignVrfy)
DocterRoutes.post("/loginDoc",loginDoc)
DocterRoutes.post("/loginVrfy",loginVrfy)
DocterRoutes.get("/authdocter",authdoc)
export  default DocterRoutes