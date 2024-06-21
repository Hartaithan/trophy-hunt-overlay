"use client";

import type { FC } from "react";
import type { Game } from "@/models/game";
import { Checkbox, CheckboxCard, Group, Text } from "@mantine/core";
import GameImage from "@/components/GameImage/GameImage";
import classes from "./GameListItem.module.css";

interface Props {
  activeGame: Game | null;
  game: Game;
  onGameChange: () => void;
}

const GameListItem: FC<Props> = (props) => {
  const { activeGame, game, onGameChange } = props;
  return (
    <CheckboxCard
      className={classes.container}
      checked={activeGame?.id === game.id}
      onClick={onGameChange}>
      <Group className={classes.row}>
        <GameImage
          src={game.thumbnail}
          title={game.title}
          isOverlay={game.platforms.includes("PS5")}
        />
        <Checkbox.Indicator ml="auto" />
      </Group>
      <Text className={classes.title}>{game.title}</Text>
    </CheckboxCard>
  );
};

export default GameListItem;
