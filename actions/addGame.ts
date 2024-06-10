import type { ActionResponse } from "@/models/action";
import type { Game } from "@/models/game";
import type { GameSearchResult } from "@/models/game";
import { dataWithUser, store } from "@/utils/firebase";
import { fetchGame } from "@/utils/game";
import { collection, doc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

export const addGame = async (
  item: GameSearchResult,
  user: User,
): Promise<ActionResponse> => {
  const { url, name } = item;
  try {
    let game: Game | null = await fetchGame(url);
    if (!game) {
      console.error("unable to fetch game");
      return {
        status: "error",
        message: `Unable to add ${name}`,
      };
    }
    const ref = collection(store, "games");
    const data = dataWithUser(game, user);
    await setDoc(doc(ref), data);
    return {
      status: "success",
      message: `${name} successfully added!`,
    };
  } catch (error) {
    console.info("unable to fetch game", error);
    return {
      status: "error",
      message: `Unable to add ${name}`,
    };
  }
};
