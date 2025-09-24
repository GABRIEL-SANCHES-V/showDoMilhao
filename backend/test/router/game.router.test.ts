import { after, before, afterEach, beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import request from 'supertest';

import app from '../../src/app.js';
import pool from '../../src/database/connectionDB.js';


describe('Game Routes Tests', {concurrency: false},() => {
    after(() => {
        pool.end();
    });

    before(async() => {
        await request(app)
            .delete('/game/clear-games')
            .send();
    });

    beforeEach(async () => {     
        await request(app)
            .delete('/game/clear-games')
            .send();

        await request(app)
            .post('/game/setup-questions')
            .send();

        const userName = "Test User 0";
        
        await request(app)
            .post('/game/start')
            .send({ userName });
    });

    afterEach(async () => {
        await request(app)
            .delete('/game/clear-games')
            .send();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it("should start a new game", async () => {
        const userName = "Test User";
        const gameResponse = await request(app)
            .post('/game/start')
            .send({ userName });

        assert.strictEqual(gameResponse.status, 200, "Response status should be 200");
        assert.ok(gameResponse.body.game, "Game object should be present in the response");
        assert.strictEqual(typeof gameResponse.body.game.gameId, 'number', "Game ID should be a number");
        assert.strictEqual(Array.isArray(gameResponse.body.game.questions), true, "Questions should be an array");
        assert.strictEqual(gameResponse.body.game.questions.length, 10, "There should be 10 questions in the game");
    });

    it("should finish a game", async () => {

        const score = 5000;
        const gameID = 1; // Assuming the first game has ID 1

        const finishResponse = await request(app)
            .post('/game/finish')
            .send({ score, gameID });

        assert.strictEqual(finishResponse.status, 200, "Response status should be 200");
        assert.strictEqual(finishResponse.body.message, "Game finished successfully", "Message should indicate successful game finish");
    });

    it("should drop a game", async () => {

        const gameID = 1; // Assuming the first game has ID 1

        const dropResponse = await request(app)
            .post('/game/drop')
            .send({ gameID });

        assert.strictEqual(dropResponse.status, 200, "Response status should be 200");
        assert.strictEqual(dropResponse.body.message, "Game dropped successfully", "Message should indicate successful game drop");
    });

    it("should get game ranking", async () => {

        const userName1 = "Test User 1";
        const userName2 = "Test User 2";
        const userName3 = "Test User 3";
        
        await request(app)
            .post('/game/start')
            .send({ userName: userName1 });

        await request(app)
            .post('/game/start')
            .send({ userName: userName2 });

        await request(app)
            .post('/game/start')
            .send({ userName: userName3 });

        const score1 = 3000;
        const score2 = 7000;
        const score3 = 5000;
        const score4 = 10000; // Score for the initial user "Test User 0"

        const gameID1 = 2; // Assuming the second game has ID 2
        const gameID2 = 3; // Assuming the third game has ID 3
        const gameID3 = 4; // Assuming the fourth game has ID 4
        const gameID4 = 1; // Assuming the first game has ID 1

        await request(app)
            .post('/game/finish')
            .send({ score: score4, gameID: gameID4 });

        await request(app)
            .post('/game/finish')
            .send({ score: score1, gameID: gameID1 });

        await request(app)
            .post('/game/finish')
            .send({ score: score2, gameID: gameID2 });

        await request(app)
            .post('/game/finish')
            .send({ score: score3, gameID: gameID3 });

        const rankingResponse = await request(app)
            .get('/game/ranking')
            .send();
        
        assert.strictEqual(rankingResponse.status, 200, "Response status should be 200");
        assert.strictEqual(Array.isArray(rankingResponse.body.ranking), true, "Ranking should be an array");
        assert.strictEqual(rankingResponse.body.ranking.length, 4, "There should be 4 players in the ranking");
        
    });


});
