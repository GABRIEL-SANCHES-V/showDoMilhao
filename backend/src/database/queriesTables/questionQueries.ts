import Database from "../database.js";

class QuestionQueries {
  private db: Database;

  public constructor() {
    this.db = Database.getInstance();
  }

  /**
   * add a new question to the database
   * @param questionLevel - string - The difficulty level of the question e.g. 'easy', 'medium', 'hard'
   * @param statement - string - The question text
   * @param options - Array of strings - The options for the question
   * @param correctAnswer - string - The correct answer index (e.g. 'a', 'b', 'c', 'd')
   * @returns The created question with the generated ID
   * @error Throws an error if there is an issue creating the question
   */
    public async addQuestion(questionLevel: string, statement: string, options: string[], correctAnswer: string): Promise<{ id: number, status: boolean }> {
        try {
            const { alternativeA, alternativeB, alternativeC, alternativeD } =
            { alternativeA: options[0], alternativeB: options[1], alternativeC: options[2], alternativeD: options[3] };
            
            const sql = "INSERT INTO question (questionLevel, statement, alternativeA, alternativeB, alternativeC, alternativeD, correctAnswer) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [result] = await this.db.query(sql, [questionLevel, statement, alternativeA, alternativeB, alternativeC, alternativeD, correctAnswer]);
            const insertId = Number((result as any).insertId);

            return { id: insertId , status: true };

        } catch (error) {
            throw error;
        }
    }

  /**
   * Gets 10 random questions from the database, 4 easy, 4 medium, and 2 hard
   * @returns Array of questions
   * @error Throws an error if there is an issue retrieving questions
   */
    public async getRandomQuestions(): Promise<{ questions: any[], status: boolean }> {
        try {
        const sql = `
            (SELECT * FROM question WHERE questionLevel = 'easy' ORDER BY RAND() LIMIT 4)
            UNION
            (SELECT * FROM question WHERE questionLevel = 'medium' ORDER BY RAND() LIMIT 4)
            UNION
            (SELECT * FROM question WHERE questionLevel = 'hard' ORDER BY RAND() LIMIT 2)
        `;
        const [rows] = await this.db.query(sql);

        return {
            questions: rows as any[],
            status: true
        };
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

    /**
     * closes the database connection
     * @returns void
     * @error Throws an error if there is an issue closing the connection
     */
    public async closeConnection(): Promise<void> {
        try {
            this.db.closeConnection();
        } catch (error) {
            throw error;
        }
    }
}

export default new QuestionQueries();