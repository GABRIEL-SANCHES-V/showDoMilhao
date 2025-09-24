import { Game } from "../model/game.model.js";

class GameManager{
    private game: Map<string, Game> = new Map();

    getGame(id: string): Game | undefined {
        return this.game.get(id);
    }

    addGame(game: Game): Game {
        if(!this.game.has((game.getId()).toString())) {
            this.game.set((game.getId()).toString(), game);
        }
        return this.game.get((game.getId()).toString())!;
    }

    removeGame(id: string): void {
        this.game.delete(id);
    }

    clearAllGames(): void {
        this.game.clear();
    }

}

export default new GameManager();