import mongoose from "mongoose";

const SlotBookSchema = new mongoose.Schema({
    Hname:{
        type:String,
        require:true,
    },
    Vname:{
        type:String,
        require:true,
    },
    SlotTime:{
        type:String,
        require:true,
    },
    UsercreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    hostId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"hostWrokSpace",
    },
    status:{
     type:String,
     default:"Pending"
    }
},{timestamps:true})

const BookingSlots = mongoose.model.BookingSlot || mongoose.model("BookingSlot",SlotBookSchema)

export default BookingSlots