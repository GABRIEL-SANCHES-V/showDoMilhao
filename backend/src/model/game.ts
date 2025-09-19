import gameQueries from "../database/queriesTables/gameQueries.js";
import Question from "./question.js";
import User from "./user.js";

class Game {
    private queries = gameQueries;
    private question: Question;
    private user: User;
    private score: number;
    private currentQuestion: number;
    private questions: any[];

    public constructor(userName: string) {
        this.question = new Question();
        this.user = new User(userName);
        this.score = 0;
        this.currentQuestion = 0;
        this.questions = [];
    }

}