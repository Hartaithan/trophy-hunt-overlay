import type { ComponentPropsWithoutRef, FC } from "react";
import type { ActiveTrophy } from "@/models/trophy";
import { AnimatePresence, motion } from "framer-motion";
import { transition } from "@/constants/animation";
import classes from "./OverlayTrophy.module.css";

interface Props extends ComponentPropsWithoutRef<"pre"> {
  trophy: ActiveTrophy | null;
}

const OverlayTrophy: FC<Props> = (props) => {
  const { trophy, ...rest } = props;
  return (
    <AnimatePresence>
      {trophy && (
        <motion.div {...transition}>
          <pre className={classes.container} {...rest}>
            active trophy {JSON.stringify(trophy, null, 2)}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayTrophy;
