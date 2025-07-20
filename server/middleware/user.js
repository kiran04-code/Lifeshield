import { validUser } from "../auth/user.js"

export const authUser = (cookiesName)=>{
 return(req,res,next)=>{
    const token = req.cookies[cookiesName]
    if(!token){
        return next();
    }
    const paylaod =  validUser(token)
    req.user = paylaod
 }
}