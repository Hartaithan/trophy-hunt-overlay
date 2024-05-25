"use client";

import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  fontFamily: string;
}

const AppProviders: FC<Props> = (props) => {
  const { children, fontFamily } = props;
  return (
    <MantineProvider theme={{ ...theme, fontFamily }} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
};

export default AppProviders;
