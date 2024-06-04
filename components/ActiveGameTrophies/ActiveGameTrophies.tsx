import type { Dispatch, FC, SetStateAction } from "react";
import { Flex } from "@mantine/core";
import classes from "./ActiveGameTrophies.module.css";
import type { FetchGameResponse } from "@/models/game";
import type { Trophy } from "@/models/trophy";

interface Props {
  activeGame: FetchGameResponse | null;
  activeTrophy: Trophy | null;
  setActiveTrophy: Dispatch<SetStateAction<Trophy | null>>;
}

const ActiveGameTrophies: FC<Props> = (props) => {
  const { activeGame, activeTrophy } = props;
  return (
    <Flex className={classes.container}>
      active game: {activeGame?.title}
      <br />
      active trophy: {activeTrophy?.name}
    </Flex>
  );
};

export default ActiveGameTrophies;
