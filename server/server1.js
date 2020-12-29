import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import { errorHandler } from "./middleWares/errorMiddleware.js";
import session from "express-session";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(
  session({
    secret: "secret", // Sign session id-related cookie s
    resave: true,
    saveUninitialized: false, // Save uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 3, // Set the effective time of session in milliseconds
    },
  })
);

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV;
app.listen(port, () => {
  console.log(`Server is running on ${mode} mode on port ${port}`);
});
