import type { ComponentPropsWithoutRef, FC } from "react";
import type { ActiveGame } from "@/models/game";
import { AnimatePresence, motion } from "framer-motion";
import { transition } from "@/constants/animation";
import classes from "./OverlayGame.module.css";

interface Props extends ComponentPropsWithoutRef<"pre"> {
  game: ActiveGame | null;
}

const OverlayGame: FC<Props> = (props) => {
  const { game, ...rest } = props;
  return (
    <AnimatePresence>
      {game && (
        <motion.div {...transition}>
          <pre className={classes.container} {...rest}>
            active game {JSON.stringify(game, null, 2)}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayGame;
