import { afterEach, describe, beforeEach, it, after} from 'node:test';
import assert from 'node:assert';

import UserQueries from "../../src/database/queriesTables/userQueries.js";
import connection from "../../src/database/connectionDB.js";

describe("UserQueries Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    afterEach(async () => {
        await UserQueries.clearUsers();
    });

    beforeEach(async () => {
        await UserQueries.clearUsers();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('Should register a new user', async () => {
        const user = await UserQueries.registerUser('John Doe');
        const userId = user.id;
        const userName = user.name;

        assert.ok(userId, "User ID should be defined");
        assert.strictEqual(userName, 'John Doe', "User name should match the input");
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
            const createdUser = await UserQueries.registerUser(user.name);
            assert.ok(createdUser.id, "User ID should be defined");
            assert.strictEqual(createdUser.name, user.name, "User name should match the input");
        }
    });

    it('Should retrieve all users', async () => {
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
            await UserQueries.registerUser(user.name);
        }
        const users = await UserQueries.getAllUsers();
        assert.ok(Array.isArray(users.users), "Users should be an array");
        assert.ok(users.users.length == 10, "There should be exactly 10 users in the database");
    });

    it('Should clear all users', async () => {
        await UserQueries.clearUsers();
        const users = await UserQueries.getAllUsers();
        assert.ok(Array.isArray(users.users), "Users should be an array");
        assert.ok(users.users.length === 0, "There should be no users in the database");
    });

    it('Should update a user score', async () => {
        const user = await UserQueries.registerUser('John Doe');
        const userId = user.id;

        await UserQueries.updateScore(userId, 150);
        const users = await UserQueries.getAllUsers();
        const score = (users.users as any)[0].score;

        assert.ok(Array.isArray(users.users), "Users should be an array");
        assert.ok(users.users.length === 1, "There should be exactly one user in the database");
        assert.strictEqual(score, 150, "User score should be updated to 150");
    });
});
