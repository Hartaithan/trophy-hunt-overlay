"use client";

import type { ActiveState, Game } from "@/models/game";
import type { Trophy } from "@/models/trophy";
import { useAuth } from "@/providers/AuthProvider";
import { isAuthenticated } from "@/utils/auth";
import { database, store } from "@/utils/firebase";
import { Flex, Loader } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { Group, Stack } from "@mantine/core";
import classes from "./GamesSection.module.css";
import ActiveGame from "@/components/ActiveGame/ActiveGame";
import ActiveGameTrophies from "@/components/ActiveGameTrophies/ActiveGameTrophies";
import GameList from "@/components/GameList/GameList";
import { child, get, ref } from "firebase/database";

const GamesSection: FC = () => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<Game[]>([]);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeTrophy, setActiveTrophy] = useState<Trophy | null>(null);
  const isFetched = useRef<boolean>(false);

  const fetchGames = useCallback(async () => {
    if (!isAuthenticated(user)) return;
    if (isFetched.current) return;
    const gamesRef = collection(store, "games");
    const gamesQuery = query(gamesRef, where("user_id", "==", user.uid));
    const activeRef = ref(database);
    let activeState: ActiveState = { game: null, trophy: null };
    try {
      const [gamesRes, activeRes] = await Promise.allSettled([
        getDocs(gamesQuery),
        get(child(activeRef, user?.uid)),
      ]);
      isFetched.current = true;
      if (activeRes.status === "fulfilled") {
        const activeValue = activeRes.value.val();
        if (activeValue) activeState = activeValue;
      }
      if (gamesRes.status === "fulfilled") {
        const gamesData: Game[] = gamesRes.value.docs.map((doc) => {
          const game: Game = {
            id: doc.id,
            ...(doc.data() as Omit<Game, "id">),
          };
          if (game?.id === activeState?.game?.id) setActiveGame(game);
          if (activeState?.trophy)
            setActiveTrophy({ ...activeState?.trophy } as unknown as Trophy);
          return game;
        });
        setGames(gamesData);
      }
    } catch (error) {
      console.error("unable to fetch games", error);
    } finally {
      setLoading(false);
    }
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

  return (
    <Stack className={classes.container}>
      <Group className={classes.header}>
        <ActiveGame activeGame={activeGame} activeTrophy={activeTrophy} />
        <ActiveGameTrophies
          activeGame={activeGame}
          activeTrophy={activeTrophy}
          setActiveTrophy={setActiveTrophy}
        />
      </Group>
      <GameList
        activeGame={activeGame}
        games={games}
        setActiveGame={setActiveGame}
      />
    </Stack>
  );
};

export default GamesSection;
