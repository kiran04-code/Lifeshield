import JWT from "jsonwebtoken"

export const  createTokenforDocter = (user)=>{
const playlaod = {
    _id:user._id,
    email:user.email,
    Number:user.Number,
}

const token = JWT.sign(playlaod,process.env.JWT_SCREATE_KEY)
return token;
} 

export const validUser = (token)=>{
    const pyload = JWT.verify(token,process.env.JWT_SCREATE_KEY)
    return pyload 
}