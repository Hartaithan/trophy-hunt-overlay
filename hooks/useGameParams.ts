import type { ActiveGame, Game, GameSearchResult } from "@/models/game";

interface GameParams {
  isOverlay: boolean;
}

const useGameParams = (
  game: Game | GameSearchResult | ActiveGame | null | undefined,
): GameParams => {
  const isOverlay = game?.platforms ? game?.platforms.includes("PS5") : false;
  return { isOverlay };
};

export default useGameParams;
