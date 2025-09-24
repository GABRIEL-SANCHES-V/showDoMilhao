import dotenv from "dotenv";
import express from "express";
import userRouter from "./router/userRouter.js";
import gameRouter from "./router/gameRouter.js";

dotenv.config({quiet: true });

const app = express();
app.use(express.json());

app.use("/api", userRouter);
app.use("/game", gameRouter);


export default app;