import { AppShell } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";
import NavLinks from "@/components/NavLinks/NavLinks";
import ProfileView from "@/components/ProfileView/ProfileView";

const Navbar: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <AppShell.Navbar>
      {children}
      <NavLinks />
      <ProfileView />
    </AppShell.Navbar>
  );
};

export default Navbar;
