import type { ActionResponse } from "@/models/action";
import type { FetchGameResponse } from "@/models/game";
import type { SearchResult } from "@/models/search";
import { database } from "@/utils/firebase";
import { fetchGame } from "@/utils/game";
import { collection, doc, setDoc } from "firebase/firestore";

export const addGame = async (item: SearchResult): Promise<ActionResponse> => {
  const { url, name } = item;
  try {
    let game: FetchGameResponse | null = await fetchGame(url);
    if (!game) {
      console.error("unable to fetch game");
      return {
        status: "error",
        message: `Unable to add ${name}`,
      };
    }
    const gamesRef = collection(database, "games");
    await setDoc(doc(gamesRef), game);
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
