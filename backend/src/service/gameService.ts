import Game from '../model/game.js';
import type Question from '../model/question.js';
import type User from '../model/user.js';

/**
 * Method to start a new game
 * @param userId - Id of the user
 * @return Object with the status of the operation
 * @error Throws an error if there is an issue starting the game
 */
export async function startGame(userId: string): Promise< {game: Game, message: string} > {
    try {
        const game = new Game(userId);
        const response = await game.startGame();

        const message = response.status ? 'Game started successfully' : 'Error starting game';

        return{ game: game, message: message}

    } catch (error) {
        throw error;
    }
}

/**
 * Method to finish game
 * @param game: Game - Instance that was started
 * @param score: number - Finished Score of user
 * @returns a messagem of sucessfully or error
 */
export async function finishGame(game: Game, score: number): Promise < {message: string} > {
    try {
        const response = game.finishGame(score)

        const message = (await response).status ? 'Game Finish wit sucessfully' : 'Error finish game';

        return { message: message }
    } catch (error) {
        throw error
    }
}

/**
 * Method to drop game inProgress
 * @param game - Instance of the game to be dropped
 * @return Object with the status of the operation
 */
export async function dropGame(game: Game): Promise < {message: string} > {
    try {
        const response = game.dropGame();

        const message = (await response).status ? 'Game dropped successfully' : 'Error dropping game';

        return { message: message }
    } catch (error) {
        throw error
    }
}

/**
 * method to get ranking of scores of all users
 * @return Array of user objects with their scores
 * @error Throws an error if there is an issue retrieving users
 */
export async function getGameRanking(game: Game) {
    try {
        const response = await game.getUserRanking();

        const ranking = response.ranking;
        const message = response.status ? 'Ranking retrieved successfully' : 'Error retrieving ranking';

        return { status: response.status, message: message, ranking: ranking };

    } catch (error) {
        throw error;
    }
}