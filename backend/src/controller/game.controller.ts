import { type Request, type Response } from "express";
import gameManeger from "../service/gameManeger.service.js";
import GameService from "../service/game.service.js";
import { Question, Difficulty } from "../model/question.model.js";

class GameController {

    private GameManager = gameManeger;


    /**
     * Starts a new game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the game information.
     * @error Returns 400 status with error message if there is an issue
     */
    public async startGame(req: Request, res: Response){
        try {
            const { userName } = req.body;

            const {game: game} = await GameService.startGame(userName);

            gameManeger.addGame(game);

            const infosGame: {
                gameId: number,
                questions: {
                    id: number,
                    level: Difficulty,
                    statement: string,
                    alternativeA: string,
                    alternativeB: string,
                    alternativeC: string,
                    alternativeD: string,
                    answer: string,
                }[]
            } = {
                gameId: game.getId(),
                questions: game.getQuestions().map((q: Question) => ({
                    id: q.getId(),
                    level: q.getLevel(),
                    statement: q.getStatement(),
                    alternativeA: q.getAlternativeA(),
                    alternativeB: q.getAlternativeB(),
                    alternativeC: q.getAlternativeC(),
                    alternativeD: q.getAlternativeD(),
                    answer: q.getAnswer(),
                })),
            };

            res.status(200).json({ message: "Game started successfully", game: infosGame });

        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Finishes the current game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the game status.
     * @error Returns 400 status with error message if there is an issue
     */
    public async finishGame(req: Request, res: Response){
        try {
            const { score, gameID } = req.body;

            const game = this.GameManager.getGame((gameID).toString());

            if (!game) {
                return res.status(404).json({ message: "Game not found" });
            }

            const { status: status } = await GameService.finishGame(game!, score);

            if (status) {
                this.GameManager.removeGame((gameID).toString());
            }

            res.status(200).json({ status: status, message: "Game finished successfully" });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Drops the current game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the game status.
     * @error Returns 400 status with error message if there is an issue
     */
    public async dropGame(req: Request, res: Response){
        try {
            const { gameID } = req.body;

            const game = this.GameManager.getGame((gameID).toString());

            if (!game) {
                return res.status(404).json({ message: "Game not found" });
            }

            const { status: status } = await GameService.dropGame(game);

            this.GameManager.removeGame((gameID).toString());

            res.status(200).json({ status: status, message: "Game dropped successfully" });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Gets the ranking of users by score.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with the ranking information.
     * @error Returns 400 status with error message if there is an issue
     */ 
    public async getRanking(req: Request, res: Response){
        try {
            const { ranking } = await GameService.getGameRanking();
            res.status(200).json({ ranking: ranking });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Sets up the initial questions for the game.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with a success message.
     * @error Returns 400 status with error message if there is an issue
     */
    public async setupInitialQuestions(req: Request, res: Response){
        try {
            await GameService.setupInitialQuestions();
            res.status(200).json({ message: "Initial questions set up successfully" });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Clears all games from the system.
     * @param req The request object.
     * @param res The response object.
     * @returns A JSON response with a success message.
     * @error Returns 400 status with error message if there is an issue
     */
    public async clearAllGames(req: Request, res: Response){
        try {
            await GameService.clearAllGames();
            this.GameManager.clearAllGames();
            res.status(200).json({ message: "All games cleared successfully" });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

}

export default new GameController();