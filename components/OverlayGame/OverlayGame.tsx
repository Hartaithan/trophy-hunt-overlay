import type { FC } from "react";
import { Text } from "@mantine/core";
import type { ActiveGame } from "@/models/game";
import type { HTMLMotionProps } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { transition } from "@/constants/animation";
import GameImage from "@/components/GameImage/GameImage";
import classes from "./OverlayGame.module.css";
import useGameParams from "@/hooks/useGameParams";

interface Props extends HTMLMotionProps<"div"> {
  game: ActiveGame | null;
}

const OverlayGame: FC<Props> = (props) => {
  const { game, ...rest } = props;
  const { isOverlay } = useGameParams(game);
  return (
    <AnimatePresence>
      {game && (
        <motion.div className={classes.container} {...transition} {...rest}>
          <GameImage
            className={classes.image}
            src={game.thumbnail}
            title={game.title}
            isOverlay={isOverlay}
          />
          <Text className={classes.title}>{game.title}</Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayGame;
