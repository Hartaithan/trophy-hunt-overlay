import type { FC } from "react";
import type { ActiveTrophy } from "@/models/trophy";
import type { HTMLMotionProps } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { transition } from "@/constants/animation";
import classes from "./OverlayTrophy.module.css";
import { Flex, Text } from "@mantine/core";
import Image from "next/image";

interface Props extends HTMLMotionProps<"div"> {
  trophy: ActiveTrophy | null;
}

const OverlayTrophy: FC<Props> = (props) => {
  const { trophy, ...rest } = props;
  return (
    <AnimatePresence>
      {trophy && (
        <motion.div className={classes.container} {...transition} {...rest}>
          <Image
            src={trophy.image_url ?? ""}
            width={50}
            height={50}
            alt={trophy.title ?? ""}
            unoptimized
          />
          <Flex className={classes.content}>
            <Text className={classes.title}>{trophy.title}</Text>
            <Text className={classes.description}>{trophy.description}</Text>
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayTrophy;
