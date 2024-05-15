"use client";

import { createTheme, mergeMantineTheme, DEFAULT_THEME } from "@mantine/core";

export const theme = createTheme({});

export const mantineTheme = mergeMantineTheme(DEFAULT_THEME, theme);
