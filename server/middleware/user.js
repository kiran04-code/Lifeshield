import { validUser } from "../auth/user.js"

export const authUser = (cookiesName) => {
  return (req, res, next) => {
    const token = req.cookies[cookiesName];

    // If no token, move to next middleware
    if (!token) {
      return next();
    }

    try {
      const payload = validUser(token);  // fixed typo here
      req.user = payload;
    } catch (err) {
      // Optional: log or handle invalid token
      req.user = null;
    }

    next(); // always call next() to continue the middleware chain
  };
};
