import { afterEach, describe, beforeEach, it, after} from 'node:test';
import assert from 'node:assert';

import connection from "../../src/database/connectionDB.js";
import GameService from "../../src/service/game.service.js";
import { GameState } from "../../src/model/game.model.js";
import { Difficulty } from "../../src/model/question.model.js";

describe("GameService Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    afterEach(async () => {
        await GameService.clearAllGames();
    });

    beforeEach(async () => {
        await GameService.clearAllGames();
        await GameService.setupInitialQuestions();
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('should start a new game for a user', async () => {
        const userName = "Test User";

        const game = (await GameService.startGame(userName)).game;


        assert.strictEqual(game.getId(), 1, "Game ID should be 1 for the first game");
        assert.strictEqual(game.getUser().getName(), userName, "Game user name should match the provided user name");
        assert.strictEqual(game.getState(), GameState.InProgress, "Game state should be 'InProgress'");
        assert.strictEqual(game.getQuestions().length, 10, "Game should have 10 questions assigned");

        const questionLevels = game.getQuestions().filter(q => q.getLevel() === Difficulty.EASY).length;
        const mediumLevels = game.getQuestions().filter(q => q.getLevel() === Difficulty.MEDIUM).length;
        const hardLevels = game.getQuestions().filter(q => q.getLevel() === Difficulty.HARD).length;

        assert.strictEqual(questionLevels, 4, "Game should have 4 easy level questions");
        assert.strictEqual(mediumLevels, 4, "Game should have 4 medium level questions");
        assert.strictEqual(hardLevels, 2, "Game should have 2 hard level questions");
    });

    it('should finish an in-progress game and update user score', async () => {
        const userName = "Test User";
        const initialGame = (await GameService.startGame(userName)).game;

        const scoreToSet = 5000;
        const finishedGameResponse = await GameService.finishGame(initialGame, scoreToSet);
        assert.strictEqual(finishedGameResponse.status, true, "Finishing game should return status true");

        assert.strictEqual(initialGame.getState(), GameState.Completed, "Game state should be 'Completed' after finishing");
        assert.strictEqual(initialGame.getScore(), scoreToSet, `Game score should be ${scoreToSet} after finishing`);
        assert.strictEqual(initialGame.getUser().getScore(), scoreToSet, `User score should be updated to ${scoreToSet} after finishing game`);
    });

    it('should drop a game thas is not completed', async () => {
        const userName = "Test User";
        const initialGame = (await GameService.startGame(userName)).game;

        const { game: droppedGame, status: dropStatus } = (await GameService.dropGame(initialGame));

        assert.strictEqual(dropStatus, true, "Dropping game should return status true");

        assert.strictEqual(droppedGame.getId(), 0, "Game ID should be reset to 0 after dropping");
        assert.strictEqual(droppedGame.getScore(), 0, "Game score should be 0 after dropping");
        assert.strictEqual(droppedGame.getState(), GameState.Dropped, "Game state should be 'Dropped' after dropping");
        assert.strictEqual(droppedGame.getQuestions().length, 0, "Game questions should be cleared after dropping");
        assert.strictEqual(droppedGame.getUser().getId(), 0, "User ID should be reset to 0 after dropping game");
        assert.strictEqual(droppedGame.getUser().getScore(), 0, "User score should remain 0 after dropping game");
    });

});