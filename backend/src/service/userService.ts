import { create } from 'domain';
import User from '../model/user.js';

/**
 * Method to create a new user
 * @param name - Name of the user
 * @param score - Score of the user
 * @return Object with the status of the operation
 * @error Throws an error if there is an issue creating the user
 */
export async function createUser(name: string, score: number) {
    try {
        const user = new User(name, score);
        const response = await user.createUser();
        
        const message = response.status ? 'User created successfully' : 'Error creating user';
        const infoUser = {
            name: user.getName(),
            userId: response.id,
        }

        return { status: response.status, message, user: infoUser };
    } catch (error) {
        throw error;
    }
}

/**
 * Method to get ranking of scores of all users 
 * @return Array of user objects with their scores
 * @error Throws an error if there is an issue retrieving users
 */
export async function getUserRanking() {
    try {
        const user = new User();
        const response = await user.getAllUsers();

        const ranking = response.users;
        const message = response.status ? 'Users retrieved successfully' : 'Error retrieving users';
        
        return { status: response.status, message: message, ranking: ranking };

    } catch (error) {
        throw error;
    }
}

/**
 * Method to clear all users from the database
 * @return Object with the status of the operation
 * @error Throws an error if there is an issue clearing users
 */
export async function clearAllUsers() {
    try {
        const user = new User();
        const response = await user.clearUsers();

        const message = response.status ? 'All users cleared successfully' : 'Error clearing users';

        return { status: response.status, message: message };
    } catch (error) {
        throw new Error(JSON.stringify({ status: false, message: "Error clearing users", user: null }));
    }
}