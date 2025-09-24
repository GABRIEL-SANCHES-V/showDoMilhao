export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export class Question {
    private id: number;
    private level: Difficulty;
    private statement: string;
    private alternativeA: string;
    private alternativeB: string;
    private alternativeC: string;
    private alternativeD: string;
    private answer: string;

    public constructor(id: number = 0, level: Difficulty, statement: string, alternativeA: string, alternativeB: string, alternativeC: string, alternativeD: string, answer: string) {
        this.id = id;
        this.level = level;
        this.statement = statement;
        this.alternativeA = alternativeA;
        this.alternativeB = alternativeB;
        this.alternativeC = alternativeC;
        this.alternativeD = alternativeD;
        this.answer = answer;
    }

    setId(id: number): void {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    getLevel(): Difficulty {
        return this.level;
    }

    getStatement(): string {
        return this.statement;
    }

    getAlternativeA(): string {
        return this.alternativeA;
    }

    getAlternativeB(): string {
        return this.alternativeB;
    }

    getAlternativeC(): string {
        return this.alternativeC;
    }

    getAlternativeD(): string {
        return this.alternativeD;
    }

    getAnswer(): string {
        return this.answer;
    }
}