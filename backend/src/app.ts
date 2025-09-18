import dotenv from "dotenv";
import express from "express";
import userRouter from "./router/userRouter.js";

dotenv.config({quiet: true });

const app = express();
app.use(express.json());

app.use("/api", userRouter);

export default app;