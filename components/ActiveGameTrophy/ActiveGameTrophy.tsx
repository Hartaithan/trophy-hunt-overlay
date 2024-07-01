import type { FC } from "react";
import type { Trophy } from "@/models/trophy";
import { Checkbox, CheckboxCard, Group, Text } from "@mantine/core";
import classes from "./ActiveGameTrophy.module.css";
import Image from "next/image";

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
      <Group className={classes.row}>
        <Image
          src={trophy.image_url ?? ""}
          width={50}
          height={50}
          alt={trophy.url ?? ""}
          unoptimized
        />
        <Checkbox.Indicator ml="auto" />
      </Group>
      <Text className={classes.title}>{trophy.title}</Text>
      <Text className={classes.description}>{trophy.description}</Text>
    </CheckboxCard>
  );
};

export default ActiveGameTrophy;
