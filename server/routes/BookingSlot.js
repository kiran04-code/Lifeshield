import express from "express"
import { BookingDataForDockter, BookingSlotss, findtthereBookeedSlot, handleStatusUpdate } from "../controller/BookingData.js"
const BookingRoutes = express.Router()
BookingRoutes.post("/BookSlot",BookingSlotss)
BookingRoutes.get("/findBookedSlot",findtthereBookeedSlot)
BookingRoutes.get("/BookingDataForDockter",BookingDataForDockter)
BookingRoutes.post("/handleStatusUpdate",handleStatusUpdate)
export  default BookingRoutes