import questionQueries from "../database/queriesTables/questionQueries.js";
import { QuestionLevel } from "../database/queriesTables/questionQueries.js";

/**
 * Model class for Question-related operations
 * @constructor - Initializes a Question object
 * @method addQuestion - Method to add a new question
 * @method getRandomQuestions - Method to get 10 random questions
 */
class Questions{
    private queries = questionQueries;

    public constructor() {};

    /**
     * Method to add a new question to the database
     * @return The created question with the generated ID and status true
     * @error Throws an error if there is an issue creating the question
     */
    public async registerQuestion(questionLevel: QuestionLevel, statement: string, options: string[], correctAnswer: string): Promise<{ id: number, status: boolean }> {
        try {
            const response = await this.queries.registerQuestion(questionLevel, statement, options, correctAnswer);
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Method to get 10 random questions from the database, 4 easy, 4 medium, and 2 hard
     * @return Array of questions and status true
     * @error Throws an error if there is an issue retrieving questions 
     */
    public async getRandomQuestions(): Promise<{ questions: { id: number, statement: string, options: string[], correctAnswer: string }[], status: boolean }> {
        try {
            const response = await this.queries.getRandomQuestions();
            return response;
        } catch (error) {
            throw error;
        }
    } 
}

export default Questions;