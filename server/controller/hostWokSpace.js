import hostWrokSpaces from "../model/createHostWorkspace.js";
import Docter from "../model/Docter.js";
export const createWrokSpace = async (req, res) => {
    const { formData, locationseting, number, latitude, longitide, village, timeing } = req.body
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
                lat: latitude,
                lon: longitide,
                village: village,
                timeopne: timeing

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

export const getResterData = async (req, res) => {
    try {
        const id = req.docter?._id

        if (id) {
            const existingHospitalregiter = await hostWrokSpaces.find({}).populate('profileId')
            const dataa = existingHospitalregiter.find((data) => data.profileId._id.toString() === id.toString())
            return res.json({
                success: true,
                hotData: dataa
            })
        } else {
            return res.json({
                success: true,
                hotData: null
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const findAllHostpital = async (req, res) => {
    try {
        const finaLLhospital = await hostWrokSpaces.find({}).populate('profileId')
        res.json({
            success: true,
            hotData: finaLLhospital
        })
    } catch (error) {
        console.log(error)
    }
}

export const upadeteHostbookingTime = async (req, res) => {
    try {
        const { fromTime, toTime } = req.body
        const id = req.docter?._id
        const existingHospitalregiter = await hostWrokSpaces.find({}).populate('profileId')
        const dataa = existingHospitalregiter.find((data) => data.profileId._id.toString() === id.toString())
        dataa.fromTime = fromTime
        dataa.toTime = toTime
        await dataa.save()
        res.json({
            success: true,
            message: "Time Added"
        })
    } catch (error) {
        console.log(error)
    }
}

export const findHostpitalAndBakeVrfy = async (req, res) => {
    try {
        const { vale, id } = req.body
        await hostWrokSpaces.findByIdAndUpdate(id, { verify: vale })
        return res.json({
            success: true,
            message: "Hospital Verify"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const startCunstacyService = async (req, res) => {
    try {

        const { value } = req.body
        const id = req.docter?._id
        const finWokePlace = await hostWrokSpaces.find({}).populate("profileId")
        const filterUserhotpital = finWokePlace.find((data) => data.profileId?._id.toString() === id.toString())
        await hostWrokSpaces.findByIdAndUpdate(filterUserhotpital._id, { vcallONOff: value })
        return req.jspn({
            success: true,
            message: "SucessFull to Enable to Video call Cunsultancy"
        })
    } catch (error) {

    }
}

export const createTHePackage = async (req, res) => {
    try {
        const { time, price } = req.body
        const Price = Number(price)
        const id = req.docter?._id
        const finWokePlace = await hostWrokSpaces.find({}).populate("profileId")
        const filterUserhotpital = finWokePlace.find((data) => data.profileId?._id.toString() === id.toString())

        if (!filterUserhotpital) {
            return res.status(404).json({ message: "Workspace not found for this doctor." });
        }

        filterUserhotpital.MeetingAvialbleTimeandpakcage.push({
            time,
            price: Price
        })
        await filterUserhotpital.save()
        res.json({
            success: true,
            message: "Package created"
        })
    } catch (error) {
        console.log(error)
    }
}

export const deletePackage = async (req, res) => {
    try {
        const { ids } = req.body
        const doctorId = req.docter?._id
        const filterUserhotpital = await hostWrokSpaces.findOne({ profileId: doctorId });
        if (!filterUserhotpital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        filterUserhotpital.MeetingAvialbleTimeandpakcage = filterUserhotpital.MeetingAvialbleTimeandpakcage.filter(
            (data) => data?._id.toString() !== ids.toString())
        await filterUserhotpital.save()
        return res.json({
            success: true,
            message: "Package deleted successfully."
        })
    } catch (error) {

    }
}