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
        const sql = "SELECT * FROM users";
        const [rows] = await this.db.query(sql);
        return rows;
    }

    /**
     * Cria um novo usuário no banco de dados
     * @param name - Nome do usuário
     * @returns O usuário criado com o ID gerado
    */
    public async createUser(name: string) {
        const sql = "INSERT INTO users (name) VALUES (?)";
        const [result] = await this.db.query(sql, [name]);
        const insertId = (result as any).insertId;
        return { id: insertId, name };
    }

}

export default new UserQueries();
