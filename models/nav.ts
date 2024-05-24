import type { FC } from "react";
import type { LinkProps } from "next/link";
import type { IconProps } from "@tabler/icons-react";

export interface NavItem extends LinkProps {
  id: string;
  label: string;
  icon: FC<IconProps>;
}
