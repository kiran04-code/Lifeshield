import hostRgister from "../model/hostpitalRegister.js";
export const hostRgisters = async (req, res) => {
  const { Gender, from } = req.body
  try {
    const id = req.docter?._id

    const finHostpital = await hostRgister.find({}).populate("createdBy");
    const existingHospital = finHostpital.find(
      (host) => host.createdBy._id.toString() === id.toString()
    );
    if (existingHospital) {
      return res.json({
        success: false,
        message: "Hostpital Alredy Login On this Account!"
      })
    }
    await hostRgister.create({
      fname: from.fname,
      lname: from.lname,
      Mname: from.Mname,
      date: from.date,
      Gender: Gender,
      createdBy: req.docter._id
    })
    return res.json({
      success: true,
      message: "you are Sucessfull to create Prfile on  LifeShild"
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }

}


export const docterhostpital = async (req, res) => {
  try {
    const docterId = req.docter?._id;
    const finHostpital = await hostRgister.find({}).populate("createdBy");
    const existingHospital = finHostpital.find(
      (host) => host.createdBy._id.toString() === docterId.toString()
    );
    return res.json({
      success: true,
      hostData: existingHospital,
      message: "data id Goted"
    })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}