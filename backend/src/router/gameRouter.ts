import GameController from "../controller/gameController.js";
import { Router } from "express";

const gameRouter = Router();

/**
 * Route to start a new game
 * @param id The game ID
 * @body { userName: string }
 * @returns JSON response with status, message, and game info
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/start/:id", (req, res) => GameController.startGame(req, res));

/**
 * Route to finish a game
 * @param id The game ID
 * @body { userName: string }
 * @returns JSON response with status and message
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/finish/:id", (req, res) => GameController.finishGame(req, res));

/**
 * Route to drop a game
 * @param id The game ID
 * @body { userName: string }
 * @returns JSON response with status and message
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/drop/:id", (req, res) => GameController.dropGame(req, res));

/**
 * Route to get user ranking
 * @param id The game ID
 * @body { userName: string }
 * @returns JSON response with status, message, and ranking info
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.get("/ranking/:id", (req, res) => GameController.getUserRanking(req, res));


export default gameRouter;
