import { AppShell } from "@mantine/core";
import type { FC } from "react";
import NavLinks from "@/components/NavLinks/NavLinks";
import ProfileView from "../ProfileView/ProfileView";

const Navbar: FC = () => {
  return (
    <AppShell.Navbar>
      <NavLinks />
      <ProfileView />
    </AppShell.Navbar>
  );
};

export default Navbar;
