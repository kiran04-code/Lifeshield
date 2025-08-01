
import hostWrokSpaces from "../model/createHostWorkspace.js"
import MeetBooked from "../model/MeetingBooking.js"
import { instance } from "../server.js"
import crypto from "crypto"
export const BookMeetingSlot = async (req, res) => {

    try {
        const { price } = req.body
        const ammount = Number(price)
        const option = {
            amount: ammount * 100,
            currency: "INR"
        }
        const orders = await instance.orders.create(option)
        return res.status(200).json({
            success: true,
            message: "done With Orde",
            order: orders
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "issue to create Orders"
        })
    }
}

export const paymentDone = async (req, res) => {
    console.log(req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SCREATE_KEY)
        .update(body.toString())
        .digest("hex");
    if (expectedSignature === razorpay_signature) {
        const { id, prices, duartion } = req.body;
        const ammout = Number(prices)
        const createdmeetingtBooked = await MeetBooked.create({
            userBooked: req.user._id,
            duration: duartion,
            hospitalId: id,
            payment: true,
            paymentmoney: ammout
        })
        res.json({
            success: true,
            message: "Payment Sucessfull"
        })
    }

}

export const MeetBookingDtaa = async (req, res) => {
    try {
        const id = req.user._id
        const findBookedSlot = await MeetBooked.find({}).populate("userBooked").populate("hospitalId")
        const filterBookedData = findBookedSlot.filter((data) => data.userBooked?._id.toString() === id.toString())
        return res.json({
            success: true,
            datas: filterBookedData
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAllrespectiveMeetingdata = async(req,res)=>{
    try {
        const id = req.docter?._id
       const findBookedSlot = await hostWrokSpaces.findOne({profileId:id}).populate("profileId")
      const filterid = findBookedSlot._id
        const findBookedSlots = await MeetBooked.find({}).populate("userBooked").populate("hospitalId")
        const filterBookedData = findBookedSlots.filter((data) => data.hospitalId?._id.toString() === filterid.toString())
        return res.json({
            success:true,
            meetData:filterBookedData
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}