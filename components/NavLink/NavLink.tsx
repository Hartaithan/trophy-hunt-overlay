"use client";

import type { NavItem } from "@/models/nav";
import Link from "next/link";
import type { FC } from "react";
import classes from "./NavLink.module.css";
import { Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavLink: FC<NavItem> = (props) => {
  const { id, label, href, icon: Icon, ...rest } = props;
  const pathname = usePathname();
  return (
    <Link
      key={id}
      href={href}
      prefetch={false}
      className={clsx(classes.container, pathname === href && classes.active)}
      {...rest}>
      <Icon className={classes.icon} size="1.5rem" />
      <Text className={classes.label}>{label}</Text>
    </Link>
  );
};

export default NavLink;
