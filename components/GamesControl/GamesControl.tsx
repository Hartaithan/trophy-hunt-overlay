"use client";

import { useState, type FC } from "react";
import { Grid, Group, Stack, Text } from "@mantine/core";
import type { Trophy } from "@/models/trophy";
import type { FetchGameResponse } from "@/models/game";
import classes from "./GamesControl.module.css";
import ActiveGame from "@/components/ActiveGame/ActiveGame";
import ActiveGameTrophies from "@/components/ActiveGameTrophies/ActiveGameTrophies";
import GameListItem from "@/components/GameListItem/GameListItem";

interface Props {
  games: FetchGameResponse[];
}

const GamesControl: FC<Props> = (props) => {
  const { games } = props;
  const [game, _setGame] = useState<FetchGameResponse | null>(null);
  const [trophy, _setTrophy] = useState<Trophy | null>(null);

  return (
    <Stack className={classes.container}>
      <Group className={classes.header}>
        <ActiveGame game={game} />
        <ActiveGameTrophies game={game} trophy={trophy} />
      </Group>
      <Grid className={classes.list}>
        {games && games.length === 0 && (
          <Grid.Col span={12}>
            <Text ta="center" fw="bold" mt="xl">
              Nothing found :(
            </Text>
          </Grid.Col>
        )}
        {games &&
          games.length > 0 &&
          games.map((item, idx) => (
            <Grid.Col span={3} key={idx}>
              <GameListItem key={idx} game={item} />
            </Grid.Col>
          ))}
      </Grid>
    </Stack>
  );
};

export default GamesControl;
