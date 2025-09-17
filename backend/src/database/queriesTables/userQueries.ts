import Database from "../database.js";

class UserQueries {
    private db: Database;

    public constructor() {
        this.db = Database.getInstance();
    }

    /**
     * 
     * @returns Todos os usuários do banco de dados
     */
    public async getAllUsers() {
        const sql = "SELECT name, score FROM user ORDER BY score DESC";
        const [rows] = await this.db.query(sql);

        return {
            users: rows,
            status: true
        };
    }

    /**
     * Cria um novo usuário no banco de dados
     * @param name - Nome do usuário
     * @returns O usuário criado com o ID gerado
    */
    public async createUser(name: String, score: Number) {
        const sql = "INSERT INTO user (name, score) VALUES (?, ?)";
        const [result] = await this.db.query(sql, [name, score]);
        const insertId = (result as any).insertId;

        return { id: insertId, name, score, status: true };
    }

    /**
     * Limpa todos os usuários do banco de dados
     */
    public async clearUsers() {
        const sql = "DELETE FROM user";
        const reset_id = "ALTER TABLE user AUTO_INCREMENT = 1";

        await this.db.query(sql);
        await this.db.query(reset_id);

        return { status: true };
    }

    /**
     * Fecha a conexão com o banco de dados
     */
    public closeConnection() {
        this.db.closeConnection();
    }

}

export default new UserQueries();
