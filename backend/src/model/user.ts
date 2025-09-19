import type { Query, QueryResult } from "mysql2";
import userQueries from "../database/queriesTables/userQueries.js";

/**
 * Model class for user-related operations
 * @method createUser - Method to create a new user
 * @method getAllUsers - Method to get all users
 * @method clearUsers - Method to clear all users
 */
class User {
    private queries = userQueries;
    private name: string;
    private userId?: number;


    /**
     * Constructor to initialize a User object
     * @param name - Name of the user
     * @param score - Score of the user
     */
    public constructor(name: string = 'getRanking') { 
        this.name = name;
    }

    /**
     * Method to register a new user in the database
     * @return The created user with the generated ID and status true
     * @error Throws an error if there is an issue creating the user
     */
    public async RegisterUserinDB (): Promise<{ id: number, name: string, status: boolean }> {
        try {
            const response = await this.queries.registerUser(this.name);
            this.userId = response.id;
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to get all users from the database
     * @return Array of users
     * @error Throws an error if there is an issue retrieving users
     */
    public async getAllUsers(): Promise<{ users: { name: string, score: number }[]; status: boolean }> {
        try {
            const response = await this.queries.getAllUsers();
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to clear all users from the database
     * @return status of the operation
     * @error Throws an error if there is an issue clearing users
     */
    public async clearUsers(): Promise<{ status: boolean }> {
        try {
            const response = await this.queries.clearUsers();
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to update the user's score
     * @param userId : number - ID of the user
     * @param score : number - New score to set
     * @returns status of the operation
     * @error Throws an error if there is an issue updating the score
     */
    public async updateScore(userId: number, score: number): Promise<{ status: boolean }> {
        try {
            const response = await this.queries.updateScore(userId, score);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public getName(): string {
        return this.name;
    }
    
    public getUserId(): number | undefined {
        return this.userId;
    }
}

export default User;