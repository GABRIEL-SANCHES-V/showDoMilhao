 import userRepository from "../repository/user.repository.js";
 import { User, Role } from "../model/user.model.js";


class userService {
    /**
     * Method to register a new user in the database
     * @return Created user
     * @error Throws an error if there is an issue creating the user
     */
    public async registerUser (name: string): Promise<{ user: User }> {
        try {
            if (!name || name.trim() === '') {
                throw new Error("Name is required");
            }

            const user = new User(name.trim());

            const id = (await userRepository.registerUser(user.getName())).id;
            user.setId(id);

            return {user: user};
        } catch (error) {
            throw error
        }
    }

    /**
     * Method to update the user's score
     * @param user : User - User object
     * @param score : number - New score to set
     * @returns Updated user object
     * @error Throws an error if there is an issue updating the score
     */
    public async updateScore(user: User, score: number): Promise<{ user: User }> {
        try {
            if (score < 0) {
                throw new Error("Score must be a non-negative number");
            }

            if (!(await userRepository.updateScore(user.getId(), score)).status) {
                throw new Error("Failed to update user score");
            }

            user.setScore(score);

            return { user: user };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to delete a user by ID
     * @param user : User - User object to delete
     * @returns status of the operation
     * @error Throws an error if there is an issue deleting the user
    */
    public async deleteUserById(user: User): Promise<{ status: boolean }> {
        try {
            if (!(await userRepository.deleteUserById(user.getId())).status) {
                throw new Error("Failed to delete user");
            }

            return { status: true };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to get the ranking of users by score
     * @return Array of users
     * @error Throws an error if there is an issue retrieving users
     */
    public async getRanking(): Promise<{ users: { name: string, score: number }[] }> {
        try {
            const ranking = await userRepository.getRankingOfUsers();

            if (!ranking) {
                throw new Error("Failed to retrieve ranking");
            }

            return ranking;
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
            if (!(await userRepository.clearUsers()).status){
                throw new Error("Failed to clear users");
            }

            return { status: true };
        } catch (error) {
            throw error;
        }
    }

}

export default new userService();