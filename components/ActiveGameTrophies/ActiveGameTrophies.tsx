import {
  useCallback,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { Flex, Grid, GridCol, Stack, Text } from "@mantine/core";
import classes from "./ActiveGameTrophies.module.css";
import type { Game } from "@/models/game";
import type { Trophy } from "@/models/trophy";
import ActiveGameTrophy from "@/components/ActiveGameTrophy/ActiveGameTrophy";

interface Props {
  activeGame: Game | null;
  activeTrophy: Trophy | null;
  setActiveTrophy: Dispatch<SetStateAction<Trophy | null>>;
}

const ActiveGameTrophies: FC<Props> = (props) => {
  const { activeGame, activeTrophy, setActiveTrophy } = props;

  const handleActiveTrophyChange = useCallback(
    (trophy: Trophy) => {
      setActiveTrophy((prev) => {
        if (prev?.id !== trophy.id) return trophy;
        if (prev) return null;
        return trophy;
      });
    },
    [setActiveTrophy],
  );

  return (
    <Stack className={classes.container}>
      {activeGame?.lists.map((list) => (
        <Flex key={list.id} className={classes.list}>
          <Text className={classes.heading}>{list.title}</Text>
          <Grid className={classes.container}>
            {list.trophies.map((trophy) => (
              <GridCol span={3} key={trophy.id}>
                <ActiveGameTrophy
                  trophy={trophy}
                  activeTrophy={activeTrophy}
                  onTrophyChange={() => handleActiveTrophyChange(trophy)}
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
