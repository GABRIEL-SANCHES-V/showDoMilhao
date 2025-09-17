import userQueries from "../database/queriesTables/userQueries.js";

/**
 * Model class for user-related operations
 * @method createUser - Method to create a new user
 * @method getAllUsers - Method to get all users
 * @method clearUsers - Method to clear all users
 */
class UserModel {
    private queries = userQueries;

    public constructor() { }

    /**
     * Method to register a new user in the database
     * @param name - String with the user's name
     * @param scores - Number with the user's scores
     * @return Object with the status of the operation
     */
    public createUser (name: String, scores:Number) {
        const response = this.queries.createUser(name, scores);
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
}