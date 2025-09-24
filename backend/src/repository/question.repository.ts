import Database from "../database/database.js";
import { Difficulty } from "../model/question.model.js";

class QuestionRepository {
    private db: Database;

    public constructor() {
        this.db = Database.getInstance();
    }

    /**
     * add a new question to the database
     * @param questionLevel - string - The difficulty level of the question e.g. 'easy', 'medium', 'hard'
     * @param statement - string - The question text
     * @param alternativeA - string - Option A for the question
     * @param alternativeB - string - Option B for the question
     * @param alternativeC - string - Option C for the question
     * @param alternativeD - string - Option D for the question
     * @param correctAnswer - string - The correct answer index (e.g. 'a', 'b', 'c', 'd')
     * @returns The generated ID
     * @error Throws an error if there is an issue creating the question
    */
    public async registerQuestion(
        level: Difficulty,
        statement: string,
        alternativeA: string,
        alternativeB: string,
        alternativeC: string,
        alternativeD: string,
        correctAnswer: string
    ): Promise<{ id: number }> {
        try {
            const sql = "INSERT INTO question (questionLevel, statement, alternativeA, alternativeB, alternativeC, alternativeD, correctAnswer) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [result] = await this.db.query(sql, [level, statement, alternativeA, alternativeB, alternativeC, alternativeD, correctAnswer]);
            const insertId = Number((result as any).insertId);

            return { id: insertId };

        } catch (error) {
            throw error;
        }
    }

    /**
     * Gets 10 random questions from the database, 4 easy, 4 medium, and 2 hard
     * @returns Array of questions
     * @error Throws an error if there is an issue retrieving questions
     */
    public async getRandomQuestions(): Promise<{ questions: {questionLevel: Difficulty, id: number, statement: string, alternativeA: string, alternativeB: string, alternativeC: string, alternativeD: string, correctAnswer: string }[] }> {
        try {
            const sql = `
                (SELECT * FROM question WHERE questionLevel = 'easy' ORDER BY RAND() LIMIT 4)
                UNION
                (SELECT * FROM question WHERE questionLevel = 'medium' ORDER BY RAND() LIMIT 4)
                UNION
                (SELECT * FROM question WHERE questionLevel = 'hard' ORDER BY RAND() LIMIT 2)
            `;
            const [rows] = await this.db.query(sql);

            const questions = (rows as any[]).map(row => ({
                questionLevel: (row.questionLevel as Difficulty),
                id: (row.id as number),
                statement: (row.statement as string),
                alternativeA: (row.alternativeA as string), 
                alternativeB: (row.alternativeB as string),
                alternativeC: (row.alternativeC as string),
                alternativeD: (row.alternativeD as string),
                correctAnswer: (row.correctAnswer as string)
            }));

            return { questions: questions };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Clears all questions from the database for testing purposes
     * @returns Object with the status of the operation
     * @error Throws an error if there is an issue clearing questions
     */
    public async clearQuestions(): Promise<{ status: boolean }> {
        try {
            const sql = "DELETE FROM question";
            const reset_id = "ALTER TABLE question AUTO_INCREMENT = 1";

            await this.db.query(sql);
            await this.db.query(reset_id);

            return { status: true };
        } catch (error) {
            throw error;
        }
    }
}

export default new QuestionRepository();