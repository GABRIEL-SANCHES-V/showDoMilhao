import type { QueryResult } from "mysql2";
import Database from "../database.js";

class UserQueries {
    private db: Database;

    public constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Get all users from the database ordered by score in descending order
     * @returns Array of users with their scores and names ordered by score
     * @error Throws an error if there is an issue retrieving users
     */
    public async getRankingOfUsers(): Promise<{ users: { name: string, score: number }[]}> {
        try {
            const sql = "SELECT name, score FROM user ORDER BY score DESC";
            const [rows] = await this.db.query(sql);

            const listUsers: { name: string, score: number }[] = [];
            for (const row of rows as any[]) {
                listUsers.push({ name: row.name, score: row.score });
            }

            return { users: listUsers };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Register a new user in the database
     * @param name - String - Name of the user
     * @returns ID of the created user
     * @error Throws an error if there is an issue creating the user
    */
    public async registerUser(name: string): Promise<{ id: number }> {
        try {
            const sql = "INSERT INTO user (name) VALUES (?)";
            const [result] = await this.db.query(sql, [name]);

            const insertId = (result as any).insertId;
            const userName = (result as any);
            
            return { id: insertId };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Clears all users from the database
     * @returns Object with the status of the operation
     * @error Throws an error if there is an issue clearing users
     */
    public async clearUsers(): Promise<{ status: boolean }> {
        try {
            const sql = "DELETE FROM user";
            const reset_id = "ALTER TABLE user AUTO_INCREMENT = 1";

            await this.db.query(sql);
            await this.db.query(reset_id);

            return { status: true };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the score of a user in the database
     * @param userId : number - ID of the user
     * @param score : number - New score of the user
     * @returns Object with the status of the operation
     * @error Throws an error if there is an issue updating the score
     */
    public async updateScore(userId: number, score: number): Promise<{ status: boolean }> {
        try {
            const sql = "UPDATE user SET score = ? WHERE id = ?";
            await this.db.query(sql, [score, userId]);

            return { status: true };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a user from the database by their ID
     * @param userId : number - ID of the user to be deleted
     * @returns Object with the status of the operation
     * @error Throws an error if there is an issue deleting the user
    */
    public async deleteUserById(userId: number): Promise<{ status: boolean }> {
        try {
            await this.db.query("DELETE FROM user WHERE id = ?", [userId]);
            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}

export default new UserQueries();
