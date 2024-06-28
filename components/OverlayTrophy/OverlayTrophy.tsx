import type { ComponentPropsWithoutRef, FC } from "react";
import type { ActiveTrophy } from "@/models/trophy";
import classes from "./OverlayTrophy.module.css";

interface Props extends ComponentPropsWithoutRef<"pre"> {
  trophy: ActiveTrophy | null;
}

const OverlayTrophy: FC<Props> = (props) => {
  const { trophy, ...rest } = props;
  return (
    <pre className={classes.container} {...rest}>
      active trophy {JSON.stringify(trophy, null, 2)}
    </pre>
  );
};

export default OverlayTrophy;
