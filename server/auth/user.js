import JWT from "jsonwebtoken"

export const  createToken = (user)=>{
const playlaod = {
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    Number:user.Number,
    date:user.date
}

const token = JWT.sign(playlaod,process.env.JWT_SCREATE_KEY)
return token;
} 

export const validUser = (token)=>{
    const pyload = JWT.verify(token,process.env.JWT_SCREATE_KEY)
    return pyload 
}