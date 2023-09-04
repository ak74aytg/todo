import jwt from "jsonwebtoken";
import { Users } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).send({
        success: false,
        message: "please login first",
      });
    }
    const decoded = await jwt.decode(token, process.env.jwt_secret);
    const user = await Users.findById(decoded._id);
    req.user = user;
    // console.log(req);
    next();

};
