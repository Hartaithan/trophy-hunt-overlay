import { Flex } from "@mantine/core";
import type { FC } from "react";
import classes from "./ActiveGame.module.css";
import type { FetchGameResponse } from "@/models/game";

interface Props {
  game: FetchGameResponse | null;
}

const ActiveGame: FC<Props> = (props) => {
  const { game } = props;
  return <Flex className={classes.container}>active game: {game?.title}</Flex>;
};

export default ActiveGame;
