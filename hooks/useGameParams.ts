import type { Game, GameSearchResult } from "@/models/game";

interface GameParams {
  isOverlay: boolean;
}

const useGameParams = (
  game: Game | GameSearchResult | null | undefined,
): GameParams => {
  const isOverlay = game?.platforms ? game?.platforms.includes("PS5") : false;
  return { isOverlay };
};

export default useGameParams;
