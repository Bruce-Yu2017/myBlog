import express from "express";
import { getBlogs } from "../controllers/blogsController.js";
const route = express.Router();

route.get("/", getBlogs);

export default route;
