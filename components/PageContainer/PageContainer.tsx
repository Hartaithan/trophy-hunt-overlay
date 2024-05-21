import type { FC } from "react";
import type { FlexProps } from "@mantine/core";
import { Flex } from "@mantine/core";
import classes from "./PageContainer.module.css";
import clsx from "clsx";

const PageContainer: FC<FlexProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <Flex className={clsx(classes.container, className)} {...rest}>
      {children}
    </Flex>
  );
};

export default PageContainer;
