import { createTokenforDocter } from "../auth/dockterAuth.js";
import { createToken } from "../auth/user.js";
import Docter from "../model/Docter.js";
import { sendmaintoUser } from "../util/email.js";

export const DocterCreateAccount = async (req, res) => {
    try {
        const { Number, email } = req.body
        const findUserinDB = await Docter.findOne({ email })
        if (findUserinDB) {
            return res.json({
                success: false,
                message: "User Alredy Exist!"
            })
        }
        else {
            const otps = Math.floor(1000 + Math.random() * 9000);
            const data = await Docter.create({
                email,
                Number,
                otp: otps
            })
            await sendmaintoUser(email, otps)
            return res.json({
                success: true,
                message: "OTP Send successfully!"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message

        })
    }
    res.json({
        success: true,
        message: "OTP Send  Done!"
    })
}
export const SignVrfy = async (req, res) => {

    try {
        const { otp, fromsdata } = req.body
        const originmailid = fromsdata.email
        const findUser = await Docter.findOne({ email: originmailid })
        const NumsOtps = Number(otp)
        const otps = findUser.otp
        if (otps === NumsOtps) {
            findUser.otp = undefined,
                findUser.save()
            const token = createTokenforDocter(findUser)
            return res.cookie("Docter_user", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // must be true in prod
                sameSite: "Strict", // or "Lax" or "None" (if cross-site)
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
                .json({
                    success: true,
                    message: "User Login successfully!",
                    userData: true,
                })
        }
        else {
            return res.json({
                success: false,
                message: "Invalid Otp"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            sucess: false,
            message: error.message
        })
    }
}

export const loginDoc = async (req, res) => {
    try {
        const { fromsdata } = req.body
        const validemail = fromsdata.email
        const findUser = await Docter.findOne({ email: validemail })
        if (!findUser) {
            return res.json({
                success: false,
                message: "Account not Exist!"
            })

        } else {
            const otps = Math.floor(1000 + Math.random() * 9000);
            findUser.otp = otps
            findUser.save()
            await sendmaintoUser(validemail, otps)
            res.json({
                success: true,
                message: "OTP Send successfully! "
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const loginVrfy = async (req, res) => {
    try {
        const { otp, fromsdata } = req.body;
        const validEmila = fromsdata.email;
        const findUser = await Docter.findOne({ email: validEmila })
        const NumsOtps = Number(otp)
        const otps = findUser.otp
        if (NumsOtps === otps) {
            findUser.otp = undefined,
                findUser.save()
            const token = createTokenforDocter(findUser)
            return res.cookie("Docter_user", token, {
               httpOnly: true,       // Prevents client-side JavaScript from accessing the cookie
        secure: true,         // Ensures cookie is sent only over HTTPS
        sameSite: "none",
            }).json({
                success: true,
                message: " User Login successfully!",
                userData: findUser
            })
        }
        else {
            return res.json({
                success: false,
                message: "In valid Otp"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            success: true,
            message: error.message
        })
    }
}

export const authdoc = async (req, res) => {
    try {
        if (!req.docter) {
            return res.status(400).json({
                message: "Unothrized Userr"
            })
        }
        const id = req.docter._id
        const findUser = await Docter.findById(id)
        res.json({
            success: true,
            userData: findUser
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const DocterLogout = (req, res) => {
    try {
        return res.clearCookie("Docter_user").json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}