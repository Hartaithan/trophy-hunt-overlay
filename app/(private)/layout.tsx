import type { FC, PropsWithChildren } from "react";
import { AuthProvider } from "@/providers/AuthProvider";

const PrivateLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <AuthProvider>{children}</AuthProvider>;
};

export default PrivateLayout;
