import type { FC } from "react";
import { Flex } from "@mantine/core";
import classes from "./ActiveGameTrophies.module.css";
import type { FetchGameResponse } from "@/models/game";
import type { Trophy } from "@/models/trophy";

interface Props {
  game: FetchGameResponse | null;
  trophy: Trophy | null;
}

const ActiveGameTrophies: FC<Props> = (props) => {
  const { game, trophy } = props;
  return (
    <Flex className={classes.container}>
      active game: {JSON.stringify(game, null, 2)}
      active trophy: {JSON.stringify(trophy, null, 2)}
    </Flex>
  );
};

export default ActiveGameTrophies;
