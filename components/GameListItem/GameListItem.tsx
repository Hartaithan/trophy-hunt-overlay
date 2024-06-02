import type { FC } from "react";
import type { FetchGameResponse } from "@/models/game";
import { Flex } from "@mantine/core";
import classes from "./GameListItem.module.css";

interface Props {
  game: FetchGameResponse;
}

const GameListItem: FC<Props> = (props) => {
  const { game } = props;
  return <Flex className={classes.container}>{game.title}</Flex>;
};

export default GameListItem;
