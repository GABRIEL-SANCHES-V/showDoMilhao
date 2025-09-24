import dotenv from "dotenv";
import express from "express";
import gameRouter from "./router/game.router.js";

dotenv.config({quiet: true });

const app = express();
app.use(express.json());

app.use("/game", gameRouter);

export default app;