import express from "express";
import { register, login } from "../controllers/userController.js";

const route = express.Router();

route.post("/", register);
route.post("/login", login);

export default route;
