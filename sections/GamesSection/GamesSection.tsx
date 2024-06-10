"use client";

import GamesControl from "@/components/GamesControl/GamesControl";
import type { Game } from "@/models/game";
import { useAuth } from "@/providers/AuthProvider";
import { isAuthenticated } from "@/utils/auth";
import { store } from "@/utils/firebase";
import { Flex, Loader } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState, type FC } from "react";

const GamesSection: FC = () => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<Game[]>([]);
  const isFetched = useRef<boolean>(false);

  const fetchGames = useCallback(async () => {
    if (!isAuthenticated(user)) return;
    if (isFetched.current) return;
    const gamesRef = collection(store, "games");
    const gamesQuery = query(gamesRef, where("user_id", "==", user.uid));
    const gamesRes = await getDocs(gamesQuery);
    isFetched.current = true;
    const gamesData: Game[] = gamesRes.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Game, "id">),
    }));
    setGames(gamesData);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  if (isLoading) {
    return (
      <Flex h="100%" justify="center" align="center">
        <Loader />
      </Flex>
    );
  }

  return <GamesControl games={games} />;
};

export default GamesSection;
