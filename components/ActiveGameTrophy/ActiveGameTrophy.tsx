import type { FC } from "react";
import type { Trophy } from "@/models/trophy";
import { Checkbox, CheckboxCard, Text } from "@mantine/core";
import classes from "./ActiveGameTrophy.module.css";

interface Props {
  trophy: Trophy;
  activeTrophy: Trophy | null;
  onTrophyChange: () => void;
}

const ActiveGameTrophy: FC<Props> = (props) => {
  const { trophy, activeTrophy, onTrophyChange } = props;
  return (
    <CheckboxCard
      className={classes.container}
      checked={trophy.id === activeTrophy?.id}
      onClick={onTrophyChange}>
      <Text>{trophy.title}</Text>
      <Checkbox.Indicator ml="auto" />
    </CheckboxCard>
  );
};

export default ActiveGameTrophy;
