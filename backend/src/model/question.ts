import questionQueries from "../database/queriesTables/questionQueries.js";
import { QuestionLevel } from "../database/queriesTables/questionQueries.js";

/**
 * Model class for Question-related operations
 * @constructor - Initializes a Question object
 * @method addQuestion - Method to add a new question
 * @method getRandomQuestions - Method to get 10 random questions
 */
class Question{
    private queries = questionQueries;

    private id: number;
    private level: QuestionLevel;
    private statement: string;
    private options: string[];
    private correctAnswer: string;

    public constructor(id: number = 0, level: QuestionLevel = QuestionLevel.EASY, statement: string = "", options: string[] = [], correctAnswer: string = "") {
        this.id = id;
        this.level = level;
        this.statement = statement;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

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
    public async getRandomQuestions(): Promise<Question[]> {
        try {
            const response = await this.queries.getRandomQuestions();
            const Questions: Question[] = response.questions.map(q => new Question(q.id, q.questionLevel, q.statement, q.options, q.correctAnswer));
            return Questions;
        } catch (error) {
            throw error;
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getLevel(): QuestionLevel {
        return this.level;
    }

    getStatement(): string {
        return this.statement;
    }

    getOptions(): string[] {
        return this.options;
    }

    getCorrectAnswer(): string {
        return this.correctAnswer;
    }
}

export default Question;