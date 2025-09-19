import { afterEach, describe, beforeEach, it, after} from 'node:test';
import assert from 'node:assert';

import GameQueries from "../../src/database/queriesTables/gameQueries.js";
import UserQueries from "../../src/database/queriesTables/userQueries.js";
import connection from "../../src/database/connectionDB.js";

describe("GameQueries Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    afterEach(async () => {
        await GameQueries.clearGames();
        await UserQueries.clearUsers();
    });

    beforeEach(async () => {
        await GameQueries.clearGames();
        await UserQueries.clearUsers();
    });

    it("should start a game for a user", async () => {
        const user = { name: "Test User", score: 0 };
        const userId = (await UserQueries.registerUser(user.name)).id;
        const questionIds = [1, 2, 3, 4, 5];

        const result = await GameQueries.startGame(userId, questionIds);
        assert.strictEqual(result, true);

        const [rows] = await connection.query("SELECT * FROM game WHERE userId = ? AND status = 'in_progress'", [userId]);

        assert.strictEqual((rows as any[]).length, 1);
        assert.strictEqual((rows as any)[0].userId, userId);
        assert.deepStrictEqual((rows as any)[0].questionIds, questionIds);
        assert.strictEqual((rows as any)[0].status, 'in_progress');
    });

    it("should finish a game for a user", async () => {
        const user = { name: "Test User", score: 0 };
        const userId = (await UserQueries.registerUser(user.name)).id;
        const questionIds = [6, 7, 8, 9, 10];
        const score = 3000; 

        await GameQueries.startGame(userId, questionIds);
        const result = await GameQueries.finishGame(userId, score);
        assert.strictEqual(result, true);

        const [rows] = await connection.query("SELECT * FROM game WHERE userId = ? AND status = 'completed'", [userId]);
        assert.strictEqual((rows as any[]).length, 1);
        assert.strictEqual((rows as any)[0].userId, userId);
        assert.strictEqual((rows as any)[0].score, score);
        assert.strictEqual((rows as any)[0].status, 'completed');
    });

    it("should delete an in-progress game for a user", async () => {
        const user = { name: "Test User", score: 0 };
        const userId = (await UserQueries.registerUser(user.name)).id;
        const questionIds = [11, 12, 13, 14, 15];

        await GameQueries.startGame(userId, questionIds);
        const result = await GameQueries.deleteInProgressGame(userId);
        assert.strictEqual(result, true);

        const [rows] = await connection.query("SELECT * FROM game WHERE userId = ? AND status = 'in_progress'", [userId]);
        assert.strictEqual((rows as any[]).length, 0);
    });
});