import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", (req, res) => AuthController.login(req, res));

authRouter.get("/verify", (req, res) => AuthController.verify(req, res));

export default authRouter;
