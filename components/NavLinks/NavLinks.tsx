import type { NavItem } from "@/models/nav";
import { Stack } from "@mantine/core";
import { useMemo, type FC } from "react";
import NavLink from "@/components/NavLink/NavLink";
import classes from "./NavLinks.module.css";

const links: NavItem[] = [
  {
    id: "overlay",
    label: "Overlay",
    href: "/overlay",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
  },
];

const NavLinks: FC = () => {
  const navLinks = useMemo(
    () => links.map((link) => <NavLink key={link.id} {...link} />),
    [],
  );
  return <Stack className={classes.container}>{navLinks}</Stack>;
};

export default NavLinks;
