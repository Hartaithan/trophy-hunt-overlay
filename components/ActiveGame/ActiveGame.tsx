import { Flex } from "@mantine/core";
import type { FC } from "react";
import classes from "./ActiveGame.module.css";
import type { FetchGameResponse } from "@/models/game";

interface Props {
  activeGame: FetchGameResponse | null;
}

const ActiveGame: FC<Props> = (props) => {
  const { activeGame } = props;
  return (
    <Flex className={classes.container}>active game: {activeGame?.title}</Flex>
  );
};

export default ActiveGame;
