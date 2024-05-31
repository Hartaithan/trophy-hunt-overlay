"use client";

import type { FetchGameResponse } from "@/models/game";
import { useAuth } from "@/providers/AuthProvider";
import { isAuthenticated } from "@/utils/auth";
import { database } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState, type FC } from "react";

const GamesList: FC = () => {
  const { user } = useAuth();
  const [games, setGames] = useState<FetchGameResponse[]>([]);

  const fetchGames = useCallback(async () => {
    if (!isAuthenticated(user)) return null;
    const gamesRef = collection(database, "games");
    const gamesQuery = query(gamesRef, where("user_id", "==", user.uid));
    const gamesRes = await getDocs(gamesQuery);
    const gamesData: FetchGameResponse[] = gamesRes.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<FetchGameResponse, "id">),
    }));
    setGames(gamesData);
  }, [user]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
      {JSON.stringify(games, null, 2)}
    </pre>
  );
};

export default GamesList;
