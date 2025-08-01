import mongoose from "mongoose";

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
    paymennt:{
     type:String,
     default:"false"
    }
},{timestamps:true})

const MeetBooked = mongoose.model.meetingBooking || mongoose.model("meetingBooking",SlotBookSchema)

export default MeetBooked