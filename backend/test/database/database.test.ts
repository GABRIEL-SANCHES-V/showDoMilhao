import { after, describe, it} from 'node:test';
import assert from 'node:assert';

import pool from "../../src/database/connectionDB.js";

describe("Database Integration Tests", () => {
    after(() => {
        pool.end();
    });

    it('Should connect to the test database and execute a simple query', async () => {
        const [rows] = await pool.query("SELECT 1 + 1 AS result") as [Array<{ result: number }>, any];
        assert.strictEqual(rows[0].result, 2, "Database query did not return expected result");
    });

    it('should have the correct database name from environment variables', async () => {
        console.log("Using database:", process.env.DATABASE_NAME);
        
        const [rows] = await pool.query("SELECT DATABASE() AS dbName") as [Array<{ dbName: string }>, any];
        assert.strictEqual(rows[0].dbName, process.env.DATABASE_NAME, "Database name did not match expected value");
    });

});