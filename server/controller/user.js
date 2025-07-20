
import { createToken } from "../auth/user.js";
import user from "../model/user.js";
import { sendmaintoUser } from "../util/email.js";

export const signup = async (req, res) => {

    try {
        const { fullName, email, Number, date } = req.body;
        const UserFound = await user.findOne({ email })
        if (UserFound) {
            return res.json({
                success: false,
                message: "This Email is Already Exitest"
            })

        } else {
          const  data =    await user.create({
                fullName,
                email,
                Number,
                date
            })
            const token = createToken(data)
            return  res.cookie("token_user",token).json({
                success: true,
                message: "User Login SucessFull!"
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            sucess: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await user.findOne({ email }); // Use findOne instead of find

        if (!findUser) {
            return res.json({
                success: false,
                message: "Email not found",
            });
        }

        const otps = Math.floor(1000 + Math.random() * 9000);
        findUser.otp = otps
       await  findUser.save()
        if (otps) {
            await sendmaintoUser(email, otps);
            return res.json({
                success: true,
                message: "OTP sent successfully!",
            })
        }
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
export const verify = async(req,res)=>{
 
 try {
    const {email,otp} = req.body;
    const findUserr = await user.findOne({email})
    const opts = findUserr.otp 
   if(opts === otp){
      findUserr.otp = undefined
      await findUserr.save()
      const token = createToken(findUserr)
     
      return res.cookie("token_user",token).json({
        success:true,
        message:"Login Sucessfull!",
        datas:findUserr,
    })
   }
  else{
    return res(400).json({
    success:false,
    message:"In valid Otp"
   })
   
  }

 } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message:error.message
    })
 }
}

export const logout = async(req,res)=>{
try {
    res.json({
        success:true,
        message:"Logout Sucessfull!"
    })
} catch (error) {
    console.log(error)
    res.josn({
        success:false,
        message:"Issuue for Logout"
    })
}
}

