import type { Dispatch, FC, SetStateAction } from "react";
import type { Trophy } from "@/models/trophy";

interface Props {
  trophy: Trophy;
  activeTrophy: Trophy | null;
  setActiveTrophy: Dispatch<SetStateAction<Trophy | null>>;
}

const ActiveGameTrophy: FC<Props> = (props) => {
  const { trophy } = props;
  return <div>{trophy.name}</div>;
};

export default ActiveGameTrophy;
