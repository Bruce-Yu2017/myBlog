import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV;
app.listen(port, () => {
  console.log(`Server is running on ${mode} mode on port ${port}`);
});
