import Database from "../database/database.js";

class GameRepository {
    private db: Database;

    public constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Method to start a game for a user
     * @param userId - ID of the user starting the game
     * @param questionIds - Array of question IDs for the game
     * @returns Promise that resolves when the game is started
    */
    public async startGame(userId: number, questionIds: number[]): Promise<{ id: number}> {
        try{
            const sql = "INSERT INTO game (userId, questionIds) VALUES (?, ?)";
            const result = await this.db.query(sql, [userId, JSON.stringify(questionIds)]);

            return { id: (result as any)[0].insertId };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to finish a game for a user
     * @param userId - ID of the user finishing the game
     * @param score - Final score of the game
     * @returns Promise that resolves when the game is finished
    */
    public async finishGame(gameId: number, score: number): Promise<boolean> {
        try{
            const sql = "UPDATE game SET score = ?, status = 'completed' WHERE id = ? AND status = 'in_progress'";
            await this.db.query(sql, [score, gameId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to delete an in-progress game for a user
     * @param gameId - ID of the game to be deleted
     * @returns Promise that resolves when the game is deleted
    */
    public async deleteInProgressGame(gameId: number): Promise<boolean> {
        try{
            const sql = "DELETE FROM game WHERE id = ? AND status = 'in_progress'";
            await this.db.query(sql, [gameId]);
            return true;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Method to clear all games from the database (for testing purposes)
     * @returns Promise that resolves when all games are cleared
     */
    public async clearGames(): Promise<boolean> {
        try {
            const sql = "DELETE FROM game";
            const reset_id = "ALTER TABLE game AUTO_INCREMENT = 1";
            await this.db.query(sql);
            await this.db.query(reset_id);
            return true;

        } catch (error) {
            throw error;
        }
    }
}

export default new GameRepository();