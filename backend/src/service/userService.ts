import { create } from 'domain';
import User from '../model/user.js';

/**
 * Method to create a new user
 * @param name - Name of the user
 * @param score - Score of the user
 * @return Object with the status of the operation
 */
export async function createUser(name: String, score: Number) {
    const user = new User(name, score);
    const response = await user.createUser();
    
    const message = response.status ? 'User created successfully' : 'Error creating user';
    const infoUser = {
        name: user.getName(),
        userId: response.id,
    }

    return { status: response.status, message, user: infoUser };
}

/**
 * Method to get ranking of scores of all users 
 * @return Array of user objects with their scores
 */
export async function getUserRanking() {
    const user = new User();
    const response = await user.getAllUsers();

    const ranking = response.users;
    const message = response.status ? 'Users retrieved successfully' : 'Error retrieving users';

    return { status: response.status, message: message, ranking: ranking };
}

/**
 * Method to clear all users from the database
 * @return Object with the status of the operation
 */
export async function clearAllUsers() {
    const user = new User();
    const response = await user.clearUsers();

    const message = response.status ? 'All users cleared successfully' : 'Error clearing users';

    return { status: response.status, message: message };
}