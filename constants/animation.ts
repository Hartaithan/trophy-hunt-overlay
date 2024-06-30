import type { HTMLMotionProps } from "framer-motion";

export const transition: HTMLMotionProps<"div"> = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
