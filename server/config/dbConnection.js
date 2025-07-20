import mongoose from "mongoose"

export const DBonnection = async(url)=>{
 await mongoose.connect(url)
}