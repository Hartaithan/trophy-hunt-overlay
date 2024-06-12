"use client";

import type { FC } from "react";
import type { Game } from "@/models/game";
import { Checkbox, CheckboxCard, Text } from "@mantine/core";
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
      <Text>{game.title}</Text>
      <Checkbox.Indicator ml="auto" />
    </CheckboxCard>
  );
};

export default GameListItem;
