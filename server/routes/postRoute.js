import express from "express";
import { getPosts, getPost } from "../controllers/postController.js";
const route = express.Router();

route.get("/", getPosts);
route.get("/:id", getPost);

export default route;
