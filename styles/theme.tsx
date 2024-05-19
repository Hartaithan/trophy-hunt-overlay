"use client";

import { createTheme, mergeMantineTheme, DEFAULT_THEME } from "@mantine/core";

export const customTheme = createTheme({});

export const theme = mergeMantineTheme(DEFAULT_THEME, customTheme);
