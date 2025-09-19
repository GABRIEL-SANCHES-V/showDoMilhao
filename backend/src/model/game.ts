import gameQueries from "../database/queriesTables/gameQueries.js";
import Question from "./question.js";
import User from "./user.js";

enum GameState {
    NotStarted = 'notStarted',
    InProgress = 'inProgress',
    Completed = 'completed'
}
// class Game {
//     private questions: Question[];
//     private userID: number;
//     private gameID: number;
//     private score: number;

//     private user: User;
//     private gameState: GameState;
//     private queries = gameQueries;
//     private question = new Question();

//     public constructor(user: User, gameState: GameState = GameState.NotStarted) {
//         this.user = new User(user['name'], user['score']);
//         this.questions = this.question.getRandomQuestions().then(res => res.questions) as unknown as Question[];
//         this.gameState = gameState;
//     }

    // public async startGame(): Promise<{ gameId: number, status: boolean, userId: number}> {
    //     try {
    //     } catch (error) {
    //         throw error;
    //     }
    // }

// }

/**
 * 1. startGame(criar usuario, pegar as pergunta e as respontas, cria jogo,)
 * 2. dropGame(excluir o jogo, que foi iniciado mas não foi finalizado)
 * 3. FinalizedGame(Airalizar o score do usuario e finalizar o jogo)
 * 4. Criar peguntas.
 * 
 * 
 */