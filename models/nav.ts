import type { LinkProps } from "next/link";

export interface NavItem extends LinkProps {
  id: string;
  label: string;
}
