"use client";

import type { FC } from "react";
import type { Game } from "@/models/game";
import { Checkbox, CheckboxCard, Group, Text } from "@mantine/core";
import GameImage from "@/components/GameImage/GameImage";
import classes from "./GameListItem.module.css";
import useGameParams from "@/hooks/useGameParams";
import TrophyCounts from "@/components/TrophyCounts/TrophyCounts";

interface Props {
  activeGame: Game | null;
  game: Game;
  onGameChange: () => void;
}

const GameListItem: FC<Props> = (props) => {
  const { activeGame, game, onGameChange } = props;
  const { isOverlay } = useGameParams(game);
  return (
    <CheckboxCard
      className={classes.container}
      checked={activeGame?.id === game.id}
      onClick={onGameChange}>
      <Group className={classes.row}>
        <GameImage
          src={game.thumbnail}
          title={game.title}
          isOverlay={isOverlay}
        />
        <Checkbox.Indicator ml="auto" />
      </Group>
      <Text className={classes.title}>{game.title}</Text>
      <TrophyCounts counts={game.counts} size="md" mt="md" />
    </CheckboxCard>
  );
};

export default GameListItem;
