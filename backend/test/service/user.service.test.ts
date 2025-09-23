import { describe, beforeEach, after, afterEach, it} from 'node:test';
import assert from 'node:assert';

import UserService from "../../src/service/user.service.js";
import connection from "../../src/database/connectionDB.js";


describe("User Service Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    beforeEach(async () => {
        await UserService.clearUsers();
    });

    afterEach(async () => {
        await UserService.clearUsers();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('should register a new user', async () => {
        const name = "Test User";
        const { user } = await UserService.registerUser(name);

        assert.strictEqual(user.getId(), 1, "User ID should be 1 for the first user");
    });

    it('should fail to register a user with an empty name', async () => {
        const name = "   ";

        await assert.rejects(
        async () => {
                await UserService.registerUser(name);
            },
            {
                name: 'Error',
                message: 'Name is required'
            }
        );
    });

    it('should update a user score', async () => {
        const name = "Test User";
        const { user } = await UserService.registerUser(name);

        const score = 50;
        const updatedUser = (await UserService.updateScore(user, score)).user;

        assert.strictEqual(updatedUser.getScore(), score, `User score should be updated to ${score}`);
    });

    it('should fail to update a user score with a negative value', async () => {
        const name = "Test User";
        const { user } = await UserService.registerUser(name);

        const score = -10;

        await assert.rejects(
            async () => {
                await UserService.updateScore(user, score);
            },
            {
                name: 'Error',
                message: 'Score must be a non-negative number'
            }
        );
    });

    it('should delete a user by ID', async () => {
        const name = "Test User";
        const { user } = await UserService.registerUser(name);

        const result = await UserService.deleteUserById(user);

        assert.strictEqual(result.status, true, "User should be deleted successfully");
    });


    it('should get the ranking of users', async () => {
        const name1 = "Test User 1";
        const name2 = "Test User 2";
        const name3 = "Test User 3";

        const user_1 = (await UserService.registerUser(name1)).user;
        const user_2 = (await UserService.registerUser(name2)).user;
        const user_3 = (await UserService.registerUser(name3)).user;

        const userUpdated_1 = (await UserService.updateScore(user_1, 100)).user;
        const userUpdated_2 = (await UserService.updateScore(user_2, 200)).user;
        const userUpdated_3 = (await UserService.updateScore(user_3, 150)).user;

        const ranking = await UserService.getRanking();

        assert.ok(Array.isArray(ranking.users), "Ranking should be an array");
        assert.strictEqual(ranking.users.length, 3, "There should be exactly 3 users in the ranking");
        assert.deepStrictEqual(ranking.users, [
            { name: userUpdated_2.getName(), score: userUpdated_2.getScore() },
            { name: userUpdated_3.getName(), score: userUpdated_3.getScore() },
            { name: userUpdated_1.getName(), score: userUpdated_1.getScore() }
        ], "Users should be ordered by score in descending order");
    });

});