import { afterEach, describe, beforeEach, it, after} from 'node:test';
import assert from 'node:assert';

import QuestionQueries from "../../src/database/queriesTables/questionQueries.js";
import { QuestionLevel } from "../../src/database/queriesTables/questionQueries.js";
import connection from "../../src/database/connectionDB.js";

describe("QuestionQueries Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    afterEach(async () => {
        await QuestionQueries.clearQuestions();
    });

    beforeEach(async () => {
        await QuestionQueries.clearQuestions();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('should add a new question', async () => {
        const questionData = {
            questionLevel: QuestionLevel.EASY,
            statement: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correctAnswer: 'c'
        };

        const question = await QuestionQueries.registerQuestion(
            questionData.questionLevel,
            questionData.statement,
            questionData.options,
            questionData.correctAnswer
        );

        assert.ok(question.id, "Question ID should be defined");
        assert.strictEqual(question.status, true, "Status should be true");
    });

    it('should add multiple questions', async () => {
        const questionsToAdd: { questionLevel: QuestionLevel, statement: string, options: string[], correctAnswer: string }[] = [
            { questionLevel: QuestionLevel.EASY, statement: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: 'b' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'What is the capital of Germany?', options: ['Berlin', 'Vienna', 'Zurich', 'Hamburg'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.HARD, statement: 'What is the square root of 256?', options: ['14', '15', '16', '17'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.EASY, statement: 'What color is the sky?', options: ['Blue', 'Green', 'Red', 'Yellow'], correctAnswer: 'a' },
            { questionLevel: QuestionLevel.MEDIUM, statement: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'c' },
            { questionLevel: QuestionLevel.HARD, statement: 'Who developed the theory of relativity?', options: ['Newton', 'Einstein', 'Galileo', 'Tesla'], correctAnswer: 'b' }
        ];

        for (const q of questionsToAdd) {
            const question = await QuestionQueries.registerQuestion(q.questionLevel, q.statement, q.options, q.correctAnswer);
            assert.ok(question.id, "Question ID should be defined");
            assert.strictEqual(question.status, true, "Status should be true");
        }
    });

    it('should retrieve 10 random questions with correct distribution', async () => {
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
    
        const randomQuestions = await QuestionQueries.getRandomQuestions();
        assert.ok(Array.isArray(randomQuestions.questions), "Questions should be an array");
        assert.strictEqual(randomQuestions.questions.length, 10, "Should retrieve exactly 10 questions");

        const easyQuestions = randomQuestions.questions.filter(q => q.questionLevel === QuestionLevel.EASY);
        const mediumQuestions = randomQuestions.questions.filter(q => q.questionLevel === QuestionLevel.MEDIUM);
        const hardQuestions = randomQuestions.questions.filter(q => q.questionLevel === QuestionLevel.HARD);

        assert.strictEqual(easyQuestions.length, 4, "Should retrieve exactly 4 easy questions");
        assert.strictEqual(mediumQuestions.length, 4, "Should retrieve exactly 4 medium questions");
        assert.strictEqual(hardQuestions.length, 2, "Should retrieve exactly 2 hard questions");
    });

});