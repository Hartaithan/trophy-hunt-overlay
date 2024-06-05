import { Flex, Text } from "@mantine/core";
import type { FC } from "react";
import classes from "./ActiveGame.module.css";
import type { FetchGameResponse } from "@/models/game";
import GameImage from "@/components/GameImage/GameImage";

interface Props {
  activeGame: FetchGameResponse | null;
}

const ActiveGame: FC<Props> = (props) => {
  const { activeGame } = props;

  if (!activeGame) {
    return (
      <Flex className={classes.container}>
        <Text>Pick active game!</Text>
      </Flex>
    );
  }

  return (
    <Flex className={classes.container}>
      <GameImage
        className={classes.image}
        src={activeGame.thumbnail}
        name={activeGame.title}
        isOverlay={activeGame.platforms.includes("PS5")}
        imageProps={{ fill: true }}
      />
      <Text className={classes.title}>{activeGame.title}</Text>
    </Flex>
  );
};

export default ActiveGame;
