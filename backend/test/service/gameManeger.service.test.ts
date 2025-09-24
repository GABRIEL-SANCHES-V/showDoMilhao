import { afterEach, describe, beforeEach, it, after} from 'node:test';
import assert from 'node:assert';

import connection from "../../src/database/connectionDB.js";
import GameService from "../../src/service/game.service.js";
import GameManager from "../../src/service/gameManeger.service.js";
import { GameState } from "../../src/model/game.model.js";


describe("GameService Integration Tests", {concurrency: false} , () => {
    after(async () => {
        connection.end();
    });

    afterEach(async () => {
        await GameService.clearAllGames();
        GameManager.clearAllGames();
    });

    beforeEach(async () => {
        await GameService.clearAllGames();
        await GameService.setupInitialQuestions();

        GameManager.clearAllGames();

        const userName = "Test User";
        const initialGame = (await GameService.startGame(userName)).game;
        GameManager.addGame(initialGame);
    });

    it('should have the correct database name from environment variables', async () => {
        const nameDB = process.env.DATABASE_NAME;
        assert.strictEqual(nameDB, 'showDoMilhaoTest', "Database name did not match expected value");
    });

    it('should find the existing game in GameManager and conclude the game', async () => {
        const gameId = 1;
        const game = GameManager.getGame(gameId.toString());

        const { game: gameFinished, status: finishStatus } = await GameService.finishGame(game!, 5000);
        
        assert.strictEqual(finishStatus, true, "Finishing game should return status true");

        assert.strictEqual(gameFinished.getState(), GameState.Completed, "Game state should be 'Completed' after finishing");
        assert.strictEqual(gameFinished.getScore(), 5000, `Game score should be 5000 after finishing`);
        assert.strictEqual(gameFinished.getUser().getScore(), 5000, `User score should be updated to 5000 after finishing game`);
    });

    it('should drop the game from GameManager after removal', async () => {
        const gameId = 1;
        const game = GameManager.getGame(gameId.toString());

        assert.ok(game, "Game should exist in GameManager before removal");

        const { game: droppedGame, status: dropStatus } = (await GameService.dropGame(game!));

        assert.strictEqual(dropStatus, true, "Dropping game should return status true");

        assert.strictEqual(droppedGame.getId(), 0, "Game ID should be reset to 0 after dropping");
        assert.strictEqual(droppedGame.getScore(), 0, "Game score should be 0 after dropping");
        assert.strictEqual(droppedGame.getState(), GameState.Dropped, "Game state should be 'Dropped' after dropping");

        GameManager.removeGame(gameId.toString());
        const removedGame = GameManager.getGame(gameId.toString());
        assert.strictEqual(removedGame, undefined, "Game should be removed from GameManager after dropping");
    });


});