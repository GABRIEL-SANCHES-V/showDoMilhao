import { Game, GameState } from "../model/game.model.js";
import UserService from "./user.service.js";
import QuestionService from "./question.service.js";
import GameRepository from "../repository/game.repository.js";

class GameService {
    /**
     * Method to start a new game
     * @param userName - Name of the user starting the game
     * @return The created game with the status true
     * @error Throws an error if there is an issue creating the game
     */
    public async startGame(userName: string): Promise<{ game: Game }> {
        try {
            const user = (await UserService.registerUser(userName)).user;
            if (!user.getId()) {
                throw new Error("User ID is not set. Cannot start game.");
            }

            const questions = ((await QuestionService.getRandomQuestions()).questions);
            const questionIds = questions.map(q => q.getId());
            if (questionIds.length === 0) {
                throw new Error("No questions available to start the game.");
            }

            const { id: gameId } = (await GameRepository.startGame(user.getId(), questionIds));
            const game = new Game();
            game.setId(gameId);
            game.setState(GameState.InProgress);
            game.setUser(user);
            game.setQuestions(questions);

            return { game: game };
            
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to finish game
     * @param game - Instance that was started
     * @param score - Finished Score of user
     * @returns a messagem of sucessfully or error
     */
    public async finishGame(game: Game, score: number): Promise<{game: Game, status: boolean }>{
        try {
            if (game.getState() !== GameState.InProgress) {
                throw new Error("Game is not in progress. Cannot finish game.");
            }

            if (score < 0) {
                throw new Error("Score cannot be negative.");
            }
            game.setScore(score);
            game.setState(GameState.Completed);

            game.setUser((await UserService.updateScore(game.getUser(), game.getScore())).user);

            const success = await GameRepository.finishGame(game.getId(), game.getScore());
            if (!success) {
                throw new Error("Failed to finish game.");
            }

            return { game: game, status: success };
        } catch (error) {
            throw error
        }
    }


    /**
     * Method to drop game inProgress
     * @param game - Instance of the game to be dropped
     * @return Object with the status of the operation
     */
    public async dropGame(game: Game): Promise<{ game: Game, status: boolean }> {
        try {
            const success = await GameRepository.deleteInProgressGame(game.getId());

            await UserService.deleteUserById(game.getUser());

            game.setScore(0);
            game.setState(GameState.Dropped);
            game.setId(0);
            game.setQuestions([]);
            game.getUser().setId(0);
            game.getUser().setScore(0);

            if (!success) {
                throw new Error("Failed to drop game.");
            }

            return { game: game, status: success };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Method ranking of users by score
     * @return Array of user objects with their scores
     * @error Throws an error if there is an issue retrieving users
     */
    public async getGameRanking(): Promise<{ ranking: { name: string, score: number }[] }> {
        try {
            const ranking = (await UserService.getRanking()).users;
            if (!ranking) {
                throw new Error("Failed to retrieve ranking.");
            }

            return { ranking: ranking };

        } catch (error) {
            throw error;
        }
    }


    /**
     * Method to clear all games from the database (for testing purposes)
     * @returns Promise that resolves when all games are cleared
     */
    public async clearAllGames(): Promise<boolean> {
        try {
            const successGames = await GameRepository.clearGames();
            if (!successGames) {
                throw new Error("Failed to clear games.");
            }
            
            const successUsers = (await UserService.clearUsers()).status;
            if (!successUsers) {
                throw new Error("Failed to clear users.");
            }

            const successQuestions = (await QuestionService.clearQuestions()).status;
            if (!successQuestions) {
                throw new Error("Failed to clear questions.");
            }

            return true;

        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to set up questions in the database
     * @returns Promise that resolves when initial questions are set up
     */
    public async setupInitialQuestions(): Promise<boolean> {
        try {
            const success = (await QuestionService.setupInitialQuestions()).status;
            if (!success) {
                throw new Error("Failed to set up initial questions.");
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default new GameService();