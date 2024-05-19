"use client";

import type { ContainerProps } from "@mantine/core";
import {
  createTheme,
  mergeMantineTheme,
  DEFAULT_THEME,
  Container,
} from "@mantine/core";

const ContainerDefaultProps: Partial<ContainerProps> = {
  size: "xl",
  px: { base: "md", xl: 0 },
  py: "md",
};

export const customTheme = createTheme({
  components: {
    Container: Container.extend({
      defaultProps: ContainerDefaultProps,
    }),
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, customTheme);
