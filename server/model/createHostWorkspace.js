import mongoose from "mongoose";

const hostpitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    specialization: {
        type: String,
        require: true
    },
    Number: {
        type: Number,
        require: true,
    },
    lat: {
        type: Number,
        require: true
    },
    lon: {
        type: Number,
        require: true
    },
    village: {
        type: String,
        require: true
    },
    timeopne: {
        type: String,
        require: true
    },
    fromTime: {
        type: String,
        require: true
    },
    toTime: {
        type: String,
        require: true
    },
    MeetingAvialbleTime:{
        type:Array,
        default:[]
    },
    MeetingPrice:{
        type:Number,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "docter"
    },
    verify:{
        type:Boolean,
        default:false
    }

})

const hostWrokSpaces = mongoose.model.hostWrokSpace || mongoose.model("hostWrokSpace", hostpitalSchema)

export default hostWrokSpaces