import type { NavItem } from "@/models/nav";
import Link from "next/link";
import type { FC } from "react";
import classes from "./NavLink.module.css";

const NavLink: FC<NavItem> = (props) => {
  const { id, label, href, ...rest } = props;
  return (
    <Link
      key={id}
      href={href}
      prefetch={false}
      className={classes.container}
      {...rest}>
      {label}
    </Link>
  );
};

export default NavLink;
