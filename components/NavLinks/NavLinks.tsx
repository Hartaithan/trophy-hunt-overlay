import type { NavItem } from "@/models/nav";
import { Stack } from "@mantine/core";
import { useMemo, type FC } from "react";
import NavLink from "@/components/NavLink/NavLink";
import classes from "./NavLinks.module.css";
import {
  IconDeviceDesktop,
  IconDeviceGamepad2,
  IconHome,
} from "@tabler/icons-react";

const links: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: IconHome,
  },
  {
    id: "games",
    label: "Games",
    href: "/games",
    icon: IconDeviceGamepad2,
  },
  {
    id: "overlay",
    label: "Overlay",
    href: "/overlay",
    icon: IconDeviceDesktop,
    target: "_blank",
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
