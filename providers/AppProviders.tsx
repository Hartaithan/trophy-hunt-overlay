"use client";

import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";

interface Props extends PropsWithChildren {
  fontFamily: string;
}

const AppProviders: FC<Props> = (props) => {
  const { children, fontFamily } = props;
  return (
    <MantineProvider theme={{ ...theme, fontFamily }} defaultColorScheme="dark">
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
};

export default AppProviders;
