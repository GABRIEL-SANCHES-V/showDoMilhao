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
    private score: number;

    /**
     * Constructor to initialize a User object
     * @param name - Name of the user
     * @param score - Score of the user
     */
    public constructor(name: string = 'getRanking', score: number = 0) { 
        this.name = name;
        this.score = score;
    }

    /**
     * Method to register a new user in the database
     * @return Object with the status of the operation
     * @error Throws an error if there is an issue creating the user
     */
    public createUser () {
        try {
            const response = this.queries.createUser(this.name, this.score);
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
    public getAllUsers() {
        try {
            const response = this.queries.getAllUsers();
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to clear all users from the database
     * @return Object with the status of the operation
     * @error Throws an error if there is an issue clearing users
     */
    public clearUsers() {
        try {
            const response = this.queries.clearUsers();
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Getters and Setters
    public getName() {
        return this.name;
    }

    public getScore() {
        return this.score;
    }

    public setName(name: string) {
        this.name = name;
    }
    
    public setScore(score: number) {
        this.score = score;
    }
}

export default User;