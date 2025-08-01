import express from "express"
import { BookMeetingSlot, getAllrespectiveMeetingdata, MeetBookingDtaa, paymentDone } from "../controller/MeetingBooking.js"

const meeetingRoutes = express.Router()
meeetingRoutes.post("/BookMeetingSlot",BookMeetingSlot)
meeetingRoutes.post("/payment-success",paymentDone)
meeetingRoutes.get("/MeetBookingDtaa",MeetBookingDtaa)
meeetingRoutes.get("/getAllrespectiveMeetingdata",getAllrespectiveMeetingdata)
export default meeetingRoutes