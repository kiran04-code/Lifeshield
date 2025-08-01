import mongoose from "mongoose";
import { type } from "os";

const SlotBookSchema = new mongoose.Schema({
    duration:{
        type:String,
        require:true,
    },
    userBooked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    hospitalId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"hostWrokSpace",
    },
    paymentmoney:{
        type:Number,
        require:true
    },
    payment:{
     type:String,
     default:"false"
    },
    paymentid:{
        type:String,
    }
},{timestamps:true})

const MeetBooked = mongoose.model.meetingBooking || mongoose.model("meetingBooking",SlotBookSchema)

export default MeetBooked