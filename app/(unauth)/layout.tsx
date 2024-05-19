import { Container } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const UnAuthLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Container w="100%">{children}</Container>;
};

export default UnAuthLayout;
