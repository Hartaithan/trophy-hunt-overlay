"use client";

import type { NavItem } from "@/models/nav";
import { Stack } from "@mantine/core";
import { useMemo, type FC } from "react";
import NavLink from "@/components/NavLink/NavLink";
import classes from "./NavLinks.module.css";
import {
  IconDeviceDesktop,
  IconDeviceGamepad2,
  IconHome,
  IconTextPlus,
} from "@tabler/icons-react";
import { useAuth } from "@/providers/AuthProvider";

const links: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: IconHome,
  },
  {
    id: "add",
    label: "Add games",
    href: "/add",
    icon: IconTextPlus,
  },
  {
    id: "games",
    label: "Games",
    href: "/games",
    icon: IconDeviceGamepad2,
  },
];

const NavLinks: FC = () => {
  const { user } = useAuth();
  const navLinks = useMemo(
    () => links.map((link) => <NavLink key={link.id} {...link} />),
    [],
  );
  return (
    <Stack className={classes.container}>
      {navLinks}
      {user && (
        <NavLink
          id="overlay"
          label="Overlay"
          href={`/overlay/${user.uid}`}
          icon={IconDeviceDesktop}
          target="_blank"
        />
      )}
    </Stack>
  );
};

export default NavLinks;
