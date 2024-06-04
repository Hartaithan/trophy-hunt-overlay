"use client";

import type { FC } from "react";
import type { FetchGameResponse } from "@/models/game";
import { Checkbox, CheckboxCard, Text } from "@mantine/core";
import classes from "./GameListItem.module.css";

interface Props {
  activeGame: FetchGameResponse | null;
  game: FetchGameResponse;
  onGameChange: () => void;
}

const GameListItem: FC<Props> = (props) => {
  const { activeGame, game, onGameChange } = props;
  return (
    <CheckboxCard
      className={classes.container}
      checked={activeGame?.title === game.title}
      onClick={onGameChange}>
      <Text>{game.title}</Text>
      <Checkbox.Indicator ml="auto" />
    </CheckboxCard>
  );
};

export default GameListItem;
