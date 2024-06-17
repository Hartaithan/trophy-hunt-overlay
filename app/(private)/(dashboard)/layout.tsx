"use client";

import { useDisclosure } from "@mantine/hooks";
import type { FC, PropsWithChildren } from "react";
import { AppShell, Burger, Title } from "@mantine/core";
import classes from "./layout.module.css";
import Navbar from "@/components/Navbar/Navbar";

const DashboardLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      classNames={classes}
      header={{ height: 45 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md">
      <AppShell.Header>
        <Burger
          className={classes.menu}
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Title className={classes.title} order={4} visibleFrom="sm">
          Trophy Hunt Overlay
        </Title>
      </AppShell.Header>
      <Navbar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
