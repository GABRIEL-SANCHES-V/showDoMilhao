import connection from './connectionDB.js';

class Database {
    private static instanceDB: Database;
    private connection = connection;

    private constructor() {}
    
    /**
     * Obtém a instância do banco de dados
     * @returns A instância do banco de dados
     */
    static getInstance(): Database {
        if (!Database.instanceDB) {
            Database.instanceDB = new Database();
        }
        return Database.instanceDB;
    }

    /**
     * Fecha a conexão com o banco de dados
     */
    public closeConnection() {
        this.connection.end();
    }

    /**
     * Realiza uma query no banco de dados
     * @param sql - SQL a ser executado 
     * @param params - Parâmetros da query (opcional)
     * @returns O resultado da query
     */
    public query(sql: string, params ?: any[]) {
        return this.connection.query(sql, params);
    }
}
