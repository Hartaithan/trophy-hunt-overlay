import type { Dispatch, FC, SetStateAction } from "react";
import type { FetchGameResponse } from "@/models/game";
import { Flex, Grid, GridCol, Text } from "@mantine/core";
import GameListItem from "@/components/GameListItem/GameListItem";
import classes from "./GameList.module.css";

interface Props {
  games: FetchGameResponse[];
  setGame: Dispatch<SetStateAction<FetchGameResponse | null>>;
}

const GameList: FC<Props> = (props) => {
  const { games } = props;
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
              <GameListItem key={idx} game={item} />
            </GridCol>
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default GameList;
