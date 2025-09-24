import { User } from './user.model.js';
import { Question } from './question.model.js';

export enum GameState {
    NotStarted = 'notStarted',
    InProgress = 'inProgress',
    Completed = 'completed',
    Dropped = 'dropped'
}

export class Game {
    private id: number;
    private score: number;
    private state: GameState;
    private user: User = new User();
    private questions: Question[] = [];

    public constructor() {
       this.id = 0;
       this.score = 0;
       this.state = GameState.NotStarted;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public getState(): GameState {
        return this.state;
    }

    public setState(state: GameState): void {
        this.state = state;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getQuestions(): Question[] {
        return this.questions;
    }

    public setQuestions(questions: Question[]): void {
        this.questions = questions;
    }
}