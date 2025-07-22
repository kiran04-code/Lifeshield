import { validUser } from "../auth/user.js";

export const authUserDocter = (cookiesName) => {
  return (req, res, next) => {
    const token = req.cookies[cookiesName];

    if (!token) {
      return next();
    }

    try {
      const payload = validUser(token);  
      req.docter = payload;
    } catch (err) {
      req.docter = null;
    }

    next(); 
  };
};
