import userQueries from "../database/queriesTables/userQueries.js";

/**
 * Model class for user-related operations
 * @method createUser - Method to create a new user
 * @method getAllUsers - Method to get all users
 * @method clearUsers - Method to clear all users
 */
class User {
    private queries = userQueries;
    private name: String;
    private score: Number;

    /**
     * Constructor to initialize a User object
     * @param name - Name of the user
     * @param score - Score of the user
     */
    public constructor(name: String = 'getRanking', score: Number = 0) { 
        this.name = name;
        this.score = score;
    }

    /**
     * Method to register a new user in the database
     * @return Object with the status of the operation
     */
    public createUser () {
        const response = this.queries.createUser(this.name, this.score);
        return response;
    }

    /**
     * Method to get all users from the database
     * @return Array of users
     */
    public getAllUsers() {
        const response = this.queries.getAllUsers();
        return response;
    }

    /**
     * Method to clear all users from the database
     * @return Object with the status of the operation
     */
    public clearUsers() {
        const response = this.queries.clearUsers();
        return response;
    }

    // Getters and Setters
    public getName() {
        return this.name;
    }

    public getScore() {
        return this.score;
    }

    public setName(name: String) {
        this.name = name;
    }
    
    public setScore(score: Number) {
        this.score = score;
    }
}


export default User;