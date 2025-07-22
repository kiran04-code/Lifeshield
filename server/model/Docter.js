import mongoose from "mongoose";

const DocterSchema = new mongoose.Schema({
    Number:{
        type:Number,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:Number,
    }
})

const Docter = mongoose.model.docter || mongoose.model("docter",DocterSchema)

export default Docter