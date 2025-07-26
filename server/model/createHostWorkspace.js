import mongoose from "mongoose";

const hostpitalSchema = new mongoose.Schema({
    hospitalName:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    specialization:{
        type:String,
        require:true
    },
    Number:{
        type:Number,
        require:true,
    },
   profileId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"docter"
   }
})

const hostWrokSpaces = mongoose.model.hostWrokSpace || mongoose.model("hostWrokSpace",hostpitalSchema)

export default hostWrokSpaces