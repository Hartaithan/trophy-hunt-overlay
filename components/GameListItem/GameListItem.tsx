import type { FC } from "react";
import type { FetchGameResponse } from "@/models/game";
import { UnstyledButton } from "@mantine/core";
import classes from "./GameListItem.module.css";

interface Props {
  game: FetchGameResponse;
  onClick: () => void;
}

const GameListItem: FC<Props> = (props) => {
  const { game, onClick } = props;
  return (
    <UnstyledButton className={classes.container} onClick={onClick}>
      {game.title}
    </UnstyledButton>
  );
};

export default GameListItem;
