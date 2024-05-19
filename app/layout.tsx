import "./globals.css";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type { FC, PropsWithChildren } from "react";
import AppProviders from "@/providers/AppProviders";
import { ColorSchemeScript } from "@mantine/core";

const font = Rubik({ subsets: ["latin"], fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Trophy Hunt Overlay",
  description: "Overlay for Trophy Hunt streamers",
};

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={font.className}>
        <AppProviders fontFamily={font.style.fontFamily}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
};

export default MainLayout;
