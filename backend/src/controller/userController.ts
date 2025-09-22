import * as UserService from "../service/userService.js";
import type { Request, Response } from "express";

/**
 * Method to handle user creation 
 * @param req - Request: body should contain name and score
 * @param res - Response: JSON with the status of the operation
 * @return JSON response with status, message, and user info
 * @error Returns 500 status with error message if there is an issue
 */
export async function createUser(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const response = await UserService.createUser(name);
        res.status(response.status ? 200 : 400).json(response);
    } catch (error) {
        res.status(500).json({ status: false, message: "Process creation user failed", user: null });
    }
}

/**
 * Method to handle retrieving user rankings
 * @param req - Request: not used
 * @param res - Response: JSON with the status of the operation
 * @return JSON response with status, message, and ranking array
 * @error Returns 500 status with error message if there is an issue
 */
export async function getUserRanking(req: Request, res: Response) {
    try {
        const response = await UserService.getUserRanking();
        res.status(response.status ? 200 : 400).json(response);
    } catch (error) {
        res.status(500).json({ status: false, message: "Process retrieving user ranking failed", ranking: null });
    }
}

/**
 * Method to restart game by clearing all users
 * @param req - Request: not used
 * @param res - Response: JSON with the status of the operation
 * @return JSON response with status and message
 * @error Returns 500 status with error message if there is an issue
 */
export async function clearAllUsers(req: Request, res: Response) {
    try {
        const response = await UserService.clearAllUsers();
        res.status(response.status ? 200 : 400).json(response);
    } catch (error) {
        res.status(500).json({ status: false, message: "Process clearing all users failed", user: null });
    }
}