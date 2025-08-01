import express from "express"
import { BookMeetingSlot } from "../controller/MeetingBooking.js"

const meeetingRoutes = express.Router()
meeetingRoutes.post("/BookMeetingSlot",BookMeetingSlot)
export default meeetingRoutes