import { Flex } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";
import classes from "./layout.module.css";

const PublicLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Flex className={classes.container}>{children}</Flex>;
};

export default PublicLayout;
