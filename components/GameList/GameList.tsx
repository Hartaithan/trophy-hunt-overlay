import {
  useCallback,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import type { Game } from "@/models/game";
import { Flex, Grid, GridCol, Text } from "@mantine/core";
import GameListItem from "@/components/GameListItem/GameListItem";
import classes from "./GameList.module.css";

interface Props {
  activeGame: Game | null;
  games: Game[];
  setActiveGame: Dispatch<SetStateAction<Game | null>>;
}

const GameList: FC<Props> = (props) => {
  const { activeGame, games, setActiveGame } = props;

  const handleAddItem = useCallback(
    (game: Game) => {
      setActiveGame((prev) => {
        if (prev?.id !== game?.id) return game;
        if (prev) return null;
        return game;
      });
    },
    [setActiveGame],
  );

  return (
    <Flex className={classes.container}>
      {games.length === 0 && (
        <Text ta="center" fw="bold">
          Nothing found :(
        </Text>
      )}
      {games.length > 0 && (
        <Grid className={classes.grid}>
          {games.map((item) => (
            <GridCol span={3} key={item.id}>
              <GameListItem
                activeGame={activeGame}
                game={item}
                onGameChange={() => handleAddItem(item)}
              />
            </GridCol>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default GameList;
