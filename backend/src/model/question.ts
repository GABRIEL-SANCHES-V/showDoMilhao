import questionQueries from "../database/queriesTables/questionQueries.js";

/**
 * Model class for Question-related operations
 * @constructor - Initializes a Question object
 * @method addQuestion - Method to add a new question
 * @method getRandomQuestions - Method to get 10 random questions
 */
class Question{
    private queries = questionQueries;
    private questionLevel: string;
    private statement: string;
    private options: string[];
    private correctAnswer: string;


    /**
     * Method constructor to initialize a Question object
     * @param questionLevel: string - Level of the question (easy, medium, hard)
     * @param statement: string - The question statement
     * @param options: string[] - The answer options for the question
     * @param correctAnswer: string - The correct answer for the question
     */
    public constructor(questionLevel: string = 'easy', statement: string = '', options: string[] = [], correctAnswer: string = '') {
        this.questionLevel = questionLevel;
        this.statement = statement;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    /**
     * Method to add a new question to the database
     * @return The created question with the generated ID and status true
     * @error Throws an error if there is an issue creating the question
     */
    public async addQuestion(): Promise<{ id: number, status: boolean }> {
        try {
            const response = await this.queries.addQuestion(this.questionLevel, this.statement, this.options, this.correctAnswer);
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
    public async getRandomQuestions(): Promise<{ questions: any[], status: boolean }> {
        try {
            const response = await this.queries.getRandomQuestions();
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default Question;