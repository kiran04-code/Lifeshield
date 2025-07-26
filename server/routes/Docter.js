import express from "express"
import { authdoc, DocterCreateAccount, DocterLogout, loginDoc, loginVrfy, SignVrfy } from "../controller/Docter.js"

const DocterRoutes = express.Router()
DocterRoutes.post("/Doclogin",DocterCreateAccount)
DocterRoutes.post("/SignVrfy",SignVrfy)
DocterRoutes.post("/loginDoc",loginDoc)
DocterRoutes.post("/loginVrfy",loginVrfy)
DocterRoutes.get("/authdocter",authdoc)
DocterRoutes.get("/DocterLogout",DocterLogout)
export  default DocterRoutes