"use client";

import { useState, type FC } from "react";
import { Group, Stack } from "@mantine/core";
import type { Trophy } from "@/models/trophy";
import type { FetchGameResponse } from "@/models/game";
import classes from "./GamesControl.module.css";
import ActiveGame from "@/components/ActiveGame/ActiveGame";
import ActiveGameTrophies from "@/components/ActiveGameTrophies/ActiveGameTrophies";
import GameList from "@/components/GameList/GameList";

interface Props {
  games: FetchGameResponse[];
}

const GamesControl: FC<Props> = (props) => {
  const { games } = props;
  const [activeGame, setActiveGame] = useState<FetchGameResponse | null>(null);
  const [activeTrophy, setActiveTrophy] = useState<Trophy | null>(null);

  return (
    <Stack className={classes.container}>
      <Group className={classes.header}>
        <ActiveGame activeGame={activeGame} />
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

export default GamesControl;
