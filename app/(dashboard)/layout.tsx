"use client";

import { useDisclosure } from "@mantine/hooks";
import type { FC, PropsWithChildren } from "react";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import classes from "./layout.module.css";

const DashboardLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 45 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md">
      <AppShell.Header>
        <Group className={classes.header}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={4} visibleFrom="sm">
            Trophy Hunt Overlay
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className={classes.navbar}>Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;