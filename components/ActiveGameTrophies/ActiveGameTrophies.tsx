import type { Dispatch, FC, SetStateAction } from "react";
import { Flex } from "@mantine/core";
import classes from "./ActiveGameTrophies.module.css";
import type { FetchGameResponse } from "@/models/game";
import type { Trophy } from "@/models/trophy";

interface Props {
  game: FetchGameResponse | null;
  trophy: Trophy | null;
  setTrophy: Dispatch<SetStateAction<Trophy | null>>;
}

const ActiveGameTrophies: FC<Props> = (props) => {
  const { game, trophy } = props;
  return (
    <Flex className={classes.container}>
      active game: {game?.title}
      <br />
      active trophy: {trophy?.name}
    </Flex>
  );
};

export default ActiveGameTrophies;
