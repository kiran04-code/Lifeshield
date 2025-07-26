import hostWrokSpaces from "../model/createHostWorkspace.js";
import Docter from "../model/Docter.js";
export const createWrokSpace = async (req, res) => {
    const { formData, locationseting, number } = req.body
    try {
        console.log(number)
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
                profileId: id
            })
            const datas = await Docter.findById(id);
            if (!datas) {
                console.log("No document found with this ID.");
                return;
            }
            datas.hotPitalRegisters = true;
            await datas.save(); // Await this to persist changes
            console.log("Updated data:", datas);
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
