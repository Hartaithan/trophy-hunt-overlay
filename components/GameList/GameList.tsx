import {
  useCallback,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import type { FetchGameResponse } from "@/models/game";
import { Flex, Grid, GridCol, Text } from "@mantine/core";
import GameListItem from "@/components/GameListItem/GameListItem";
import classes from "./GameList.module.css";

interface Props {
  activeGame: FetchGameResponse | null;
  games: FetchGameResponse[];
  setActiveGame: Dispatch<SetStateAction<FetchGameResponse | null>>;
}

const GameList: FC<Props> = (props) => {
  const { activeGame, games, setActiveGame } = props;

  const handleAddItem = useCallback(
    (game: FetchGameResponse) => {
      setActiveGame((prev) => {
        if (prev?.title !== game.title) return game;
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
          {games.map((item, idx) => (
            <GridCol span={3} key={idx}>
              <GameListItem
                key={idx}
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
