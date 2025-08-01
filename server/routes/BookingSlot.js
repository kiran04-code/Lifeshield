import express from "express"
import { BookingDataForDockter, BookingSlotss, findDocterName, findtthereBookeedSlot, handleStatusUpdate } from "../controller/BookingData.js"
const BookingRoutes = express.Router()
BookingRoutes.post("/BookSlot",BookingSlotss)
BookingRoutes.get("/findBookedSlot",findtthereBookeedSlot)
BookingRoutes.get("/BookingDataForDockter",BookingDataForDockter)
BookingRoutes.post("/handleStatusUpdate",handleStatusUpdate)
BookingRoutes.post("/findDocterName",findDocterName)
export  default BookingRoutes