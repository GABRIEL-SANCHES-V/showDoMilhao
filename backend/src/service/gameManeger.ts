import Game from "../model/game.js";
import * as GameService from "./gameService.js"

class GameManager{
    private game: Map<string, Game> = new Map();

    getGame(id: string, userName: string): Game {
        if(!this.game.has(id)) {
            this.game.set(id, (GameService.startGame(userName) as any).game);
        }
        return this.game.get(id)!;
    }

    removeGame(id: string): void {
        this.game.delete(id);
    }
}

export default new GameManager();