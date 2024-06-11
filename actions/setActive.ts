import type { ActionResponse } from "@/models/action";
import type { ActiveGame, Game } from "@/models/game";
import type { ActiveTrophy, Trophy } from "@/models/trophy";
import { database } from "@/utils/firebase";
import { ref, set } from "firebase/database";

export const setActive = async (
  userId: string,
  game: Game,
  trophy: Trophy,
): Promise<ActionResponse> => {
  try {
    const activeGame: ActiveGame = {
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
    };
    const activeTrophy: ActiveTrophy = {
      id: trophy.id,
      title: trophy.title,
    };

    const reference = ref(database, userId);
    await set(reference, {
      game: activeGame,
      trophy: activeTrophy,
    });
    return {
      status: "success",
      message: "Active state successfully set!",
    };
  } catch (error) {
    console.info("unable to set active state", error);
    return {
      status: "error",
      message: "Unable to set active state",
    };
  }
};
