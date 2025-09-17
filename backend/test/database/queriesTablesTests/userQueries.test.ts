import { after, describe, it} from 'node:test';
import assert from 'node:assert';

import UserQueries from "../../../src/database/queriesTables/userQueries.js";

describe("UserQueries Integration Tests", () => {
    after(() => {  
        UserQueries.closeConnection();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('Should register a new user', async () => {
        const user = await UserQueries.createUser('John Doe', 0);
        const userId = user.id;
        const userName = user.name;
        const userScore = user.score;

        assert.ok(userId, "User ID should be defined");
        assert.strictEqual(userName, 'John Doe', "User name should match the input");
        assert.strictEqual(userScore, 0, "User score should match the input");
    });

    it('slould register many users', async () => {
        const listUsers = [
            { name: 'Alice', score: 10 },
            { name: 'Bob', score: 20 },
            { name: 'Charlie', score: 30 },
            { name: 'David', score: 40 },
            { name: 'Eve', score: 50 },
            { name: 'Frank', score: 60 },
            { name: 'Grace', score: 70 },
            { name: 'Hank', score: 80 },
            { name: 'Ivy', score: 90 },
            { name: 'Jack', score: 100 }
        ]

        for (const user of listUsers) {
            const createdUser = await UserQueries.createUser(user.name, user.score);
            assert.ok(createdUser.id, "User ID should be defined");
            assert.strictEqual(createdUser.name, user.name, "User name should match the input");
            assert.strictEqual(createdUser.score, user.score, "User score should match the input");
        }
    });

    it('Should retrieve all users', async () => {
        const users = await UserQueries.getAllUsers();
        assert.ok(Array.isArray(users), "Users should be an array");
        assert.ok(users.length === 11, "There should be exactly 11 users in the database");
    });

    it('Should clear all users', async () => {
        await UserQueries.clearUsers();
        const users = await UserQueries.getAllUsers();
        assert.ok(Array.isArray(users), "Users should be an array");
        assert.ok(users.length === 0, "There should be no users in the database");
    });

});
