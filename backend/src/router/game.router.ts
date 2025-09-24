import { Router } from "express";
import GameController from "../controller/game.controller.js";

const gameRouter = Router();

/**
 * Route to start a new game
 * @body { userName: string }
 * @returns JSON response with status, message, and game info
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/start/", (req, res) => GameController.startGame(req, res));

/**
 * Route to finish a game
 * @body { score: number, gameID: number }
 * @returns JSON response with status and message
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/finish/", (req, res) => GameController.finishGame(req, res));

/**
 * Route to drop a game
 * @body { gameID: number }
 * @returns JSON response with status and message
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/drop/", (req, res) => GameController.dropGame(req, res));

/**
 * Route to get game ranking
 * @returns JSON response with status, message, and ranking info
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.get("/ranking/", (req, res) => GameController.getRanking(req, res));

/**
 * Route to setup initial questions
 * @returns JSON response with status and message
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.post("/setup-questions/", (req, res) => GameController.setupInitialQuestions(req, res));

/**
 * Route to clear all games
 * @returns JSON response with status and message
 * @error Returns 400 status with error message if there is an issue
 */
gameRouter.delete("/clear-games/", (req, res) => GameController.clearAllGames(req, res));


export default gameRouter;