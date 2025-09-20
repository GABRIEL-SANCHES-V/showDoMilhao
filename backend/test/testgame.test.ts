import { afterEach, describe, beforeEach, it, after, before} from 'node:test';
import assert from 'node:assert';

import Game from "../src/model/game.js"
import GameQueries from '../src/database/queriesTables/gameQueries.js';
import UserQueries from '../src/database/queriesTables/userQueries.js';
import QuestionQueries from '../src/database/queriesTables/questionQueries.js';
import { QuestionLevel } from '../src/database/queriesTables/questionQueries.js';
import pool from "../src/database/connectionDB.js"



describe("Game Class Integration Tests", { concurrency: false }, () => {
    after(async () => {
        await QuestionQueries.clearQuestions();
        await GameQueries.clearGames();
        await UserQueries.clearUsers();
        pool.end();
    })

    before(async () => {
        await GameQueries.clearGames();
        const questionsToAdd: { questionLevel: QuestionLevel, statement: string, options: string[], correctAnswer: string }[] = [
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q1', options: ['A1', 'B1', 'C1', 'D1'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q2', options: ['A2', 'B2', 'C2', 'D2'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q3', options: ['A3', 'B3', 'C3', 'D3'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q4', options: ['A4', 'B4', 'C4', 'D4'], correctAnswer: 'd' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q5', options: ['A5', 'B5', 'C5', 'D5'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q6', options: ['A6', 'B6', 'C6', 'D6'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q7', options: ['A7', 'B7', 'C7', 'D7'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q8', options: ['A8', 'B8', 'C8', 'D8'], correctAnswer: 'd' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q9', options: ['A9', 'B9', 'C9', 'D9'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.EASY, statement: 'Easy Q10', options: ['A10', 'B10', 'C10', 'D10'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q1', options: ['A1', 'B1', 'C1', 'D1'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q2', options: ['A2', 'B2', 'C2', 'D2'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q3', options: ['A3', 'B3', 'C3', 'D3'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q4', options: ['A4', 'B4', 'C4', 'D4'], correctAnswer: 'd' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q5', options: ['A5', 'B5', 'C5', 'D5'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q6', options: ['A6', 'B6', 'C6', 'D6'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q7', options: ['A7', 'B7', 'C7', 'D7'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q8', options: ['A8', 'B8', 'C8', 'D8'], correctAnswer: 'd' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q9', options: ['A9', 'B9', 'C9', 'D9'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'Medium Q10', options: ['A10', 'B10', 'C10', 'D10'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q1', options: ['A1', 'B1', 'C1', 'D1'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q2', options: ['A2', 'B2', 'C2', 'D2'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q3', options: ['A3', 'B3', 'C3', 'D3'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q4', options: ['A4', 'B4', 'C4', 'D4'], correctAnswer: 'd' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q5', options: ['A5', 'B5', 'C5', 'D5'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q6', options: ['A6', 'B6', 'C6', 'D6'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q7', options: ['A7', 'B7', 'C7', 'D7'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q8', options: ['A8', 'B8', 'C8', 'D8'], correctAnswer: 'd' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q9', options: ['A9', 'B9', 'C9', 'D9'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.HARD, statement: 'Hard Q10', options: ['A10', 'B10', 'C10', 'D10'], correctAnswer: 'b' },
        ];
    
        for (const q of questionsToAdd) {
            await QuestionQueries.registerQuestion(q.questionLevel, q.statement, q.options, q.correctAnswer);
        }
    })

    it('should start a new game', async () => {
        const game = new Game('Gabriel');
        const result = await game.startGame();
        
        assert.strictEqual(result.status, true)
    });

    it('should finish the game and update the user score', async () => {
        const game = new Game('Gabriel');
        await game.startGame();
        const finishResult = await game.finishGame(80);

        assert.strictEqual(finishResult.status, true);
    });

    it('should drop the game and delete the user', async () => {
        const game = new Game('ToBeDeleted');
        await game.startGame();
        const dropResult = await game.dropGame();

        assert.strictEqual(dropResult.status, true);
    });

});