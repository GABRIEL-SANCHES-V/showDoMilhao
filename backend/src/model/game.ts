import gameQueries from "../database/queriesTables/gameQueries.js";
import Question from "./question.js";
import User from "./user.js";

enum GameState {
    NotStarted = 'notStarted',
    InProgress = 'inProgress',
    Completed = 'completed'
}

class Game {
    private gameId: number;
    private score: number;
    private state: GameState;
    private user: User;
    private questions: Question[] = [];

    public constructor(nameUser: string) {
        this.gameId = 0;
        this.score = 0;
        this.state = GameState.NotStarted;
        this.user = new User(nameUser);
    }

    /**
     * Method to start a new game
     * @return The created game with the status true
     * @error Throws an error if there is an issue creating the game
     */
    public async startGame(): Promise<{ status: boolean }> {
        try {
            await this.user.RegisterUserinDB();
            this.questions = await (new Question()).getRandomQuestions();

            if (!this.user.getUserId()) {
                throw new Error("User ID is not set. Cannot start game.");
            }

            if (this.questions.length === 0) {
                throw new Error("No questions available to start the game.");
            }

            const questionsIds = this.questions.map(q => q.getId());
            const response = await gameQueries.startGame(this.user.getUserId() as number, questionsIds);

            this.gameId = response.id;
            this.state = GameState.InProgress;

            return { status: response.status };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to finish game
     * @param score - Final score of the game
     * @return Object indicating the status of the operation
     * @error Throws an error if there is an issue finishing the game
     */
    public async finishGame(score: number): Promise<{ status: boolean }> {
        try {
            this.state = GameState.Completed;
            this.score = score;
            await gameQueries.finishGame(this.user.getUserId() as number, this.score);
            await this.user.updateScore(this.user.getUserId() as number, this.score);
            return { status: true };
        } catch (error) {
            throw error;
        } 
    }

    /**
     * Method to drop the game
     * @return Object indicating the status of the operation
     * @error Throws an error if there is an issue dropping the game
     */
    public async dropGame(): Promise<{ status: boolean }> {
        try {
            this.state = GameState.Completed;
            await gameQueries.deleteInProgressGame(this.user.getUserId() as number, this.gameId);
            await this.user.deleteUserById(this.user.getUserId() as number);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }


    // Getters
    getGameId(): number {
        return this.gameId;
    }
    
    getScore(): number {
        return this.score;
    }

    getState(): GameState {
        return this.state;
    }

    getUser(): User {
        return this.user;
    }

    getQuestions(): Question[] {
        return this.questions;
    }
    



}

export default Game;

/**
 * 1. startGame(criar usuario, pegar as pergunta e as respontas, cria jogo,)
 * 2. dropGame(excluir o jogo, que foi iniciado mas não foi finalizado)
 * 3. FinalizedGame(Airalizar o score do usuario e finalizar o jogo)
 * 4. Criar peguntas.
 * 
 * 
 */