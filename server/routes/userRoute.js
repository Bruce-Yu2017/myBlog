import express from "express";
import { register, login, logout } from "../controllers/userController.js";

const route = express.Router();

route.post("/", register);
route.post("/login", login);
route.post("/logout", logout);

export default route;
