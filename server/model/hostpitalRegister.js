import mongoose from "mongoose";

const hostpitalRegisterSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
    },
    Mname:{
        type:String,
        require:true,
    },
    lname:{
      type:String,
        require:true,
    },
    Gender:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"docter",
    }
})

const hostRgister = mongoose.model.docter || mongoose.model("hostpitalRegister",hostpitalRegisterSchema)

export default hostRgister