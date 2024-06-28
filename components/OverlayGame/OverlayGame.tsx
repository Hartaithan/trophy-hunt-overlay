import type { ComponentPropsWithoutRef, FC } from "react";
import type { ActiveGame } from "@/models/game";
import classes from "./OverlayGame.module.css";

interface Props extends ComponentPropsWithoutRef<"pre"> {
  game: ActiveGame | null;
}

const OverlayGame: FC<Props> = (props) => {
  const { game, ...rest } = props;
  return (
    <pre className={classes.container} {...rest}>
      active game {JSON.stringify(game, null, 2)}
    </pre>
  );
};

export default OverlayGame;
