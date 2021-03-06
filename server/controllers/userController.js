import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400);
      throw new Error("User already exist");
    }
    const salt = await bcrypt.genSalt();
    const pw = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: pw,
    });
    if (user) {
      req.session.user = user;
      const copy = { ...user };
      delete copy._doc.password;
      res.status(200).json(copy._doc);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log("register error: ", error.message);
    res.status(error.status);
    throw new Error("server error", error);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });
  const matchPassowrd = existUser
    ? await bcrypt.compare(password, existUser.password)
    : null;
  if (existUser && matchPassowrd) {
    req.session.user = existUser;
    const copy = { ...existUser };
    delete copy._doc.password;
    res.status(200).json(copy._doc);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logout = asyncHandler(async (req, res) => {
  req.session.user = null;
  res.status(200).json({ message: "logout success" });
});

const getAuthStatus = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "success" });
});

export { register, login, logout, getAuthStatus };
