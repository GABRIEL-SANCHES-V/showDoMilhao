import * as UserController from "../controller/userController.js";
import { Router } from "express";

const userRouter = Router();

/**
 * Route to create a new user
 * @body { name: string, score: number }
 * @returns JSON response with status, message, and user info
 * @error Returns 500 status with error message if there is an issue
 */
userRouter.post("/user", UserController.createUser);

/**
 * Route to get user rankings
 * @returns JSON response with status, message, and ranking array
 * @error Returns 500 status with error message if there is an issue
 */
userRouter.get("/ranking", UserController.getUserRanking);

/**
 * Route to clear all users and restart the game
 * @returns JSON response with status and message
 * @error Returns 500 status with error message if there is an issue
 */
userRouter.delete("/user", UserController.clearAllUsers);

export default userRouter;