import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// express init
const app = express();

// config
dotenv.config({ path: "./config/config.env" });

// connect DB
connectDB();

// body-parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

// morgan
app.use(morgan("dev"));

// cors
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

// post
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started at PORT", PORT));
