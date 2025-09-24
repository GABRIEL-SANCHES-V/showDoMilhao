import { describe, beforeEach, after, afterEach, it} from 'node:test';
import assert from 'node:assert';

import QuestionService from "../../src/service/question.service.js";
import { Difficulty } from "../../src/model/question.model.js";
import connection from "../../src/database/connectionDB.js";


describe("Question Service Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    beforeEach(async () => {
        await QuestionService.clearQuestions();
    });

    afterEach(async () => {
        await QuestionService.clearQuestions();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('should register a new question', async () => {
        const level = Difficulty.EASY;
        const statement = "What is the capital of France?";
        const alternativeA = "Berlin";
        const alternativeB = "Madrid";
        const alternativeC = "Paris";
        const alternativeD = "Rome";
        const correctAnswer = "c";

        const question = (await QuestionService.registerQuestion(level, statement, alternativeA, alternativeB, alternativeC, alternativeD, correctAnswer)).question;

        assert.strictEqual(question.getId(), 1, "Question ID should be 1 for the first question");
    });

    it('should fail to register a question with an empty statement', async () => {
        const level = Difficulty.EASY;
        const statement = "   ";
        const alternativeA = "Berlin";
        const alternativeB = "Madrid";
        const alternativeC = "Paris";
        const alternativeD = "Rome";
        const correctAnswer = "c";

        await assert.rejects(
        async () => {
                await QuestionService.registerQuestion(level, statement, alternativeA, alternativeB, alternativeC, alternativeD, correctAnswer);
            },
            {
                name: 'Error',
                message: 'Statement is required'
            }
        );
    });

    it('should retrieve 10 random questions with correct distribution', async () => {

        await QuestionService.setupInitialQuestions();

        const questions = (await QuestionService.getRandomQuestions()).questions;

        assert.strictEqual(questions.length, 10, "Should retrieve exactly 10 questions");

        const easyQuestions = questions.filter(q => q.getLevel() === Difficulty.EASY);
        const mediumQuestions = questions.filter(q => q.getLevel() === Difficulty.MEDIUM);
        const hardQuestions = questions.filter(q => q.getLevel() === Difficulty.HARD);

        assert.strictEqual(easyQuestions.length, 4, "Should retrieve exactly 4 easy questions");
        assert.strictEqual(mediumQuestions.length, 4, "Should retrieve exactly 4 medium questions");
        assert.strictEqual(hardQuestions.length, 2, "Should retrieve exactly 2 hard questions");
    });
});