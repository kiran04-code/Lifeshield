import mongoose from "mongoose";
 const UserShema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        
    },
    Number:{
        type:Number,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    otp:{
        type:Number,
    }

 },{timestamps:true})


 const user = mongoose.model.user || mongoose.model("user",UserShema);

 export default user