export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export class User {
    private name: string;
    private Id: number;
    private password: string;
    private score: number;
    private role: Role;

    public constructor(name: string = 'getRanking') { 
        this.name = name;
        this.Id = 0;
        this.password = '';
        this.score = 0;
        this.role = Role.USER;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): number {
        return this.Id;
    }

    public setId(id: number): void {
        this.Id = id;
    }

    public getPassword(): string {
        return this.password;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public getRole(): Role {
        return this.role;
    }
}