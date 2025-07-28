
import { assign } from "nodemailer/lib/shared/index.js"
import BookingSlots from "../model/BookSlotVaccines.js"
import hostWrokSpaces from "../model/createHostWorkspace.js"


export const BookingSlotss =  async(req,res)=>{
 try {
    const {from ,name} = req.body
    const {hospital,time,vaccine} = from
    const data = await BookingSlots.create({
        Hname:hospital,
        SlotTime:time,
        Vname:vaccine,
        UsercreatedBy:req.user._id,
        hostId:name

    })
   return res.json({
    success:true,
    message:"Slot Booked"
  })
 } catch (error) {
    console.log(error)
   return  res.json({
        success:false,
        message:error.message
    })
 }
}

export  const findtthereBookeedSlot= async(req,res)=>{
    try {
        const id = req.user?._id
        const findBookedSlot = await BookingSlots.find({}).populate("UsercreatedBy").populate("hostId")
        const filterBookedData = findBookedSlot.filter((data)=>data.UsercreatedBy?._id.toString()=== id.toString())
        return res.json({
            success:true,
            bookedData:filterBookedData
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

export const BookingDataForDockter = async(req,res)=>{
    try {
        
        const id = req.docter?._id
        const existingHospitalregiter = await hostWrokSpaces.find({}).populate('profileId')
        const filterdata = existingHospitalregiter.find((data)=>data.profileId._id.toString() === id.toString())
       const finDBookedSlot = await BookingSlots.find({}).populate("UsercreatedBy").populate("hostId")
       const lastBookingData = finDBookedSlot.filter((data)=>data.hostId._id.toString()=== filterdata._id.toString())
       return res.json({
        success:true,
        BookingData:lastBookingData
       })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export const handleStatusUpdate = async(req,res)=>{
 try {
    const {id,status} = req.body
    const findUser = await BookingSlots.findByIdAndUpdate(id,{status})
    await findUser.save()
 } catch (error) {
    console.log(error)
 }
}