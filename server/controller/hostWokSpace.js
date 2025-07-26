import hostWrokSpaces from "../model/createHostWorkspace.js";
import Docter from "../model/Docter.js";
export const createWrokSpace = async (req, res) => {
    const { formData, locationseting, number,latitude, longitide,village,timeing} = req.body
    try {
        const id = req.docter?._id
        const adres = locationseting
        const finUser = await hostWrokSpaces.findOne({ adres })
        const finUserNumber = await hostWrokSpaces.findOne({ Number: number })
        if (finUser) {
            return res.json({
                success: false,
                message: "This Hospital is Alredy Register"
            })
        }
        if (finUserNumber) {
            return res.json({
                success: false,
                message: "Only One hostpital Register On One Number"
            })
        }
        else {
            await hostWrokSpaces.create({
                hospitalName: formData.hospitalName,
                location: locationseting,
                specialization: formData.specialization,
                Number: number,
                profileId: id,
                lat:latitude,
                lon:longitide,
                village:village,
                timeopne:timeing

            })
            const datas = await Docter.findById(id);
            if (!datas) {
                console.log("No document found with this ID.");
                return;
            }
            datas.hotPitalRegisters = true;
            await datas.save(); 
            res.json({
                success: true,
                message: "HostPital Register SucessFull!"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.messsage
        })
    }
}

export const getResterData = async(req,res)=>{
    try {
        const id = req.docter?._id

        if(id){
 const existingHospitalregiter = await hostWrokSpaces.find({}).populate('profileId')
        const dataa = existingHospitalregiter.find((data)=>data.profileId._id.toString()===  id.toString())
        return res.json({
            success:true,
            hotData:dataa
        })
        }else{
        return res.json({
            success:true,
            hotData:null
        })
        }
       
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

export const findAllHostpital = async(req,res)=>{
  try {
    const finaLLhospital = await hostWrokSpaces.find({})
    res.json({
        success:true,
        hotData:finaLLhospital
    })
  } catch (error) {
    console.log(error)
  }
}