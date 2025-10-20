import { after, before, afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';

import app from '../../src/app.js';
import pool from '../../src/database/connectionDB.js';

let token = '';

describe('Game Routes with Auth Tests', { concurrency: false }, () => {
    after(() => {
        pool.end();
    });

    before(async () => {
        const loginResponse = await request(app)
        .post('/auth/login')
        .send({ userName: 'testuser' });

        assert.strictEqual(loginResponse.status, 200, 'Login deve retornar status 200');
        assert.ok(loginResponse.body.token, 'Deve retornar um token JWT');

        token = loginResponse.body.token;

        await request(app)
        .delete('/game/clear-games')
        .set('Authorization', `Bearer ${token}`)
        .send();
    });

    beforeEach(async () => {
        await request(app)
        .delete('/game/clear-games')
        .set('Authorization', `Bearer ${token}`)
        .send();

        await request(app)
        .post('/game/setup-questions')
        .set('Authorization', `Bearer ${token}`)
        .send();

        const userName = 'Test User 0';
        await request(app)
        .post('/game/start')
        .set('Authorization', `Bearer ${token}`)
        .send({ userName });
    });

    afterEach(async () => {
        await request(app)
        .delete('/game/clear-games')
        .set('Authorization', `Bearer ${token}`)
        .send();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', 'Database name did not match expected value');
    });

    it('should start a new game', async () => {
        const userName = 'Test User';
        const gameResponse = await request(app)
        .post('/game/start')
        .set('Authorization', `Bearer ${token}`)
        .send({ userName });

        assert.strictEqual(gameResponse.status, 200);
        assert.ok(gameResponse.body.game);
        assert.strictEqual(typeof gameResponse.body.game.gameId, 'number');
        assert.strictEqual(Array.isArray(gameResponse.body.game.questions), true);
        assert.strictEqual(gameResponse.body.game.questions.length, 10);
    });

    it('should finish a game', async () => {
        const score = 5000;
        const gameID = 1;

        const finishResponse = await request(app)
        .post('/game/finish')
        .set('Authorization', `Bearer ${token}`)
        .send({ score, gameID });

        assert.strictEqual(finishResponse.status, 200);
        assert.strictEqual(finishResponse.body.message, 'Game finished successfully');
    });

    it('should drop a game', async () => {
        const gameID = 1;

        const dropResponse = await request(app)
        .post('/game/drop')
        .set('Authorization', `Bearer ${token}`)
        .send({ gameID });

        assert.strictEqual(dropResponse.status, 200);
        assert.strictEqual(dropResponse.body.message, 'Game dropped successfully');
    });

    it('should get game ranking', async () => {
        const users = ['Test User 1', 'Test User 2', 'Test User 3'];

        for (const userName of users) {
            await request(app)
                .post('/game/start')
                .set('Authorization', `Bearer ${token}`)
                .send({ userName });
            }

        const scores = [3000, 7000, 5000, 10000];
        const gameIDs = [2, 3, 4, 1];

        for (let i = 0; i < scores.length; i++) {
            await request(app)
                .post('/game/finish')
                .set('Authorization', `Bearer ${token}`)
                .send({ score: scores[i], gameID: gameIDs[i] });
            }

        const rankingResponse = await request(app)
        .get('/game/ranking')
        .set('Authorization', `Bearer ${token}`)
        .send();

        assert.strictEqual(rankingResponse.status, 200);
        assert.strictEqual(Array.isArray(rankingResponse.body.ranking), true);
        assert.strictEqual(rankingResponse.body.ranking.length, 4);
    });
});
