import { Game } from "../model/game.model.js";

class GameManager{
    private game: Map<string, Game> = new Map();

    getGame(game: Game): Game {
        if(!this.game.has(( game.getId()).toString())) {
            this.game.set(( game.getId()).toString(), game);
        }
        return this.game.get(( game.getId()).toString())!;
    }

    removeGame(id: string): void {
        this.game.delete(id);
    }

}

export default new GameManager();