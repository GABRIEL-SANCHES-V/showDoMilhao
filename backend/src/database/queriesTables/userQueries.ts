import Database from "../database.js";

class UserQueries {
    private db: Database;

    public constructor() {
        this.db = Database.getInstance();
    }

    /**
     * Get all users from the database ordered by score in descending order
     * @returns Array of users with their scores
     * @error Throws an error if there is an issue retrieving users
     */
    public async getAllUsers() {
        try {
            const sql = "SELECT name, score FROM user ORDER BY score DESC";
            const [rows] = await this.db.query(sql);

            return {
                users: rows,
                status: true
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new user in the database
     * @param name - String - Name of the user
     * @param score - Number - Score of the user
     * @returns The created user with the generated ID
     * @error Throws an error if there is an issue creating the user
    */
    public async createUser(name: string, score: number) {
        try {
            const sql = "INSERT INTO user (name, score) VALUES (?, ?)";
            const [result] = await this.db.query(sql, [name, score]);
            const insertId = (result as any).insertId;

            return { id: insertId, name, score, status: true };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Clears all users from the database
     * @returns Object with the status of the operation
     * @error Throws an error if there is an issue clearing users
     */
    public async clearUsers() {
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
     * Closes the database connection
     * @returns void
     * @error Throws an error if there is an issue closing the connection
     */
    public closeConnection() {
        try {
            this.db.closeConnection();
        } catch (error) {
            throw error;
        }
    }
}

export default new UserQueries();
