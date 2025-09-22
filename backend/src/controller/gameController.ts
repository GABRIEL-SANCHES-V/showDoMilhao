import type Question from "../model/question.js";
import GameManager from "../service/gameManeger.js";
import * as gameService from '../service/gameService.js';
import {type Request, type Response } from "express";


class GameController {

    /**
     * Starts a new game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the game information.
     * @error Returns 400 status with error message if there is an issue
     */
    public async startGame(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { userName } = req.body;

            if (typeof id !== 'string' || typeof userName !== 'string') {
                return res.status(400).json({ error: "Missing or invalid 'id' or 'userName'." });
            }

            const game = GameManager.getGame(id, userName);

            const infosGame: {
                userID: number | undefined,
                gameID: number | undefined,
                state: string,
                questions: Question[];
            } = {
                userID: game.getUser().getUserId(),
                gameID: game.getGameId(),
                state: game.getState(),
                questions: game.getQuestions(),
            }

            res.status(200).json({ status: true, message: "Game started successfully", game: infosGame });

        } catch (error) {
            res.status(400).json({ error: error });
        }
    }



    /**
     * Finishes a game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the status of the operation.
     * @error Returns 400 status with error message if there is an issue
     */
    public async finishGame(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { score , userName} = req.body;

            if (typeof id !== 'string' || typeof score !== 'number') {
                return res.status(400).json({ error: "Missing or invalid 'id' or 'score'." });
            }

            const game = GameManager.getGame(id, userName);

            if (!game) {
                return res.status(404).json({ error: "Game not found." });
            }

            const response = await gameService.finishGame(game, score);

            GameManager.removeGame(id);

            res.status(200).json({ status: true, message: response.message });

        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    
    /**
     * Drops a game.
     * @param req The request object.
     * @param res The response object.
     * @return A JSON response with the status of the operation.
     * @error Returns 400 status with error message if there is an issue
     */
    public async dropGame(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { userName } = req.body;

            if (typeof id !== 'string') {
                return res.status(400).json({ error: "Missing or invalid 'id'." });
            }

            const game = GameManager.getGame(id, userName);

            if (!game) {
                return res.status(404).json({ error: "Game not found." });
            }

            const response = await gameService.dropGame(game);

            GameManager.removeGame(id);

            res.status(200).json({ status: true, message: response.message });
            
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }


    /**
     * Gets the ranking of users in a game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the ranking information.
     * @error Returns 400 status with error message if there is an issue
     */
    public async getUserRanking(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { userName } = req.body;

            if (typeof id !== 'string') {
                return res.status(400).json({ error: "Missing or invalid 'id'." });
            }
            
            const game = GameManager.getGame(id, userName);

            if (!game) {
                return res.status(404).json({ error: "Game not found." });
            }
            
            const response = await gameService.getGameRanking(game);

            res.status(200).json({ status: response.status, message: response.message, ranking: response.ranking });

        } catch (error) {
            res.status(400).json({ error: error });
        }
    }


}