import Database from "../database.js";

class GameQueries {
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
    public async startGame(userId: number, questionIds: number[]): Promise<{ id: number, status: boolean }> {
        try{
            const sql = "INSERT INTO game (userId, questionIds) VALUES (?, ?)";
            const result = await this.db.query(sql, [userId, JSON.stringify(questionIds)]);
            const gameId = (result as any).insertId;
            return { id: gameId, status: true };
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
    public async finishGame(userId: number, score: number): Promise<boolean> {
        try{
            const sql = "UPDATE game SET score = ?, status = 'completed' WHERE userId = ? AND status = 'in_progress'";
            await this.db.query(sql, [score, userId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to delete an in-progress game for a user
     * @param userId - ID of the user whose game is to be deleted
     * @returns Promise that resolves when the game is deleted
     */
    public async deleteInProgressGame(userId: number): Promise<boolean> {
        try{
            const sql = "DELETE FROM game WHERE userId = ? AND status = 'in_progress'";
            await this.db.query(sql, [userId]);
            return true;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Method to clear all games from the database (for testing purposes)
     * @returns Promise that resolves when all games are cleared
     */
    public async clearGames(): Promise<void> {
        try {
            const sql = "DELETE FROM game";
            const reset_id = "ALTER TABLE game AUTO_INCREMENT = 1";
            await this.db.query(reset_id);
            await this.db.query(sql);
        } catch (error) {
            throw error;
        }
    }
}

export default new GameQueries();