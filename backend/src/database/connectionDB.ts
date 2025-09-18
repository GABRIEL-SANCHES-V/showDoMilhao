import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({quiet: true });

class ConnectionDB {
    private static instance: ConnectionDB;
    private pool: Pool;
    
    private getEnvVar(name: string): string {
        const value = process.env[name];
        if (!value) {
            throw new Error(`Environment variable ${name} is not set.`);
        }
        return value;
    }

    private constructor() {
        this.pool = mysql.createPool({
            port: Number(this.getEnvVar('DATABASE_PORT')),
            host: String(this.getEnvVar('DATABASE_HOST')),
            user: String(this.getEnvVar('DATABASE_USER')),
            password: String(this.getEnvVar('DATABASE_PASSWORD')),
            database: String(this.getEnvVar('DATABASE_NAME')),
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    /**
     * Obtém a instância do banco de dados
     * @returns A instância do banco de dados
     */
    static getInstance(): ConnectionDB {
        if (!ConnectionDB.instance) {
            ConnectionDB.instance = new ConnectionDB();
        }
        return ConnectionDB.instance;
    }

    /**
     * Obtém a conexão do banco de dados
     * @returns A conexão do banco de dados
     */
    getPool(): Pool {
        return this.pool;
    }
}

export default ConnectionDB.getInstance().getPool();