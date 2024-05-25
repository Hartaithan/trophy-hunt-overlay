import { Container } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";
import classes from "./layout.module.css";

const UnAuthLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Container className={classes.container}>{children}</Container>;
};

export default UnAuthLayout;
