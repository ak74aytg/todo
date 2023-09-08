import { Users } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorHandler from "../middleware/error.js";

const sendCookie = (user, res, message, status = 201) => {
  const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);
  res
    .status(status)
    .cookie("token", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure:true
    })
    .send({
      success: true,
      message,
    });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await Users.findOne({ email });
    if (user) {
      return next(new errorHandler("user already exist", 400));
    }
    const newPassword = await bcrypt.hash(password, 10);
    user = await Users.create({ name, email, password: newPassword });
    sendCookie(user, res, "user created successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ email }).select("+password");
    if (!user) {
      return next(new errorHandler("user does not exist", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new errorHandler("incorrect password", 400));
    sendCookie(user, res, "user logged in successfully");
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  const user = req.user;
  res.send({
    success: true,
    user,
  });
};

export const logout = (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send({
      success: true,
    });
};
