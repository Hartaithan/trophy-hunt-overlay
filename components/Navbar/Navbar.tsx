import { AppShell } from "@mantine/core";
import type { FC } from "react";
import NavLinks from "@/components/NavLinks/NavLinks";

const Navbar: FC = () => {
  return (
    <AppShell.Navbar>
      <NavLinks />
    </AppShell.Navbar>
  );
};

export default Navbar;
