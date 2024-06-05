import type { Dispatch, FC, SetStateAction } from "react";
import { Flex, Grid, GridCol, Stack, Text } from "@mantine/core";
import classes from "./ActiveGameTrophies.module.css";
import type { FetchGameResponse } from "@/models/game";
import type { Trophy } from "@/models/trophy";
import ActiveGameTrophy from "@/components/ActiveGameTrophy/ActiveGameTrophy";

interface Props {
  activeGame: FetchGameResponse | null;
  activeTrophy: Trophy | null;
  setActiveTrophy: Dispatch<SetStateAction<Trophy | null>>;
}

const ActiveGameTrophies: FC<Props> = (props) => {
  const { activeGame, activeTrophy, setActiveTrophy } = props;
  return (
    <Stack className={classes.container}>
      {activeGame?.lists.map((list) => (
        <Flex key={list.name} className={classes.list}>
          <Text className={classes.heading}>{list.name}</Text>
          <Grid className={classes.container}>
            {list.trophies.map((trophy) => (
              <GridCol span={3} key={trophy.url}>
                <ActiveGameTrophy
                  trophy={trophy}
                  activeTrophy={activeTrophy}
                  setActiveTrophy={setActiveTrophy}
                />
              </GridCol>
            ))}
          </Grid>
        </Flex>
      ))}
    </Stack>
  );
};

export default ActiveGameTrophies;
