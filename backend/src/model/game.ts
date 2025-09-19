import gameQueries from "../database/queriesTables/gameQueries.js";
import Question from "./question.js";
import User from "./user.js";

enum GameState {
    NotStarted = 'notStarted',
    InProgress = 'inProgress',
    Completed = 'completed'
}

class Game {
    private id: number;
    private score: number;
    private state: GameState;
    private user: User;
    private questions: Question[] = [];

    public constructor(id: number = 0, score: number = 0, state: GameState = GameState.NotStarted, nameUser: string) {
        this.id = id;
        this.score = score;
        this.state = state;
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
            
            this.id = response.id;
            this.state = GameState.InProgress;

            return { status: response.status };

        } catch (error) {
            throw error;
        }
    }

    

}

/**
 * 1. startGame(criar usuario, pegar as pergunta e as respontas, cria jogo,)
 * 2. dropGame(excluir o jogo, que foi iniciado mas não foi finalizado)
 * 3. FinalizedGame(Airalizar o score do usuario e finalizar o jogo)
 * 4. Criar peguntas.
 * 
 * 
 */