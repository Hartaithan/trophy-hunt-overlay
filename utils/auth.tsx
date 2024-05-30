import { notifications } from "@mantine/notifications";
import { IconAlertOctagon } from "@tabler/icons-react";
import type { User } from "firebase/auth";

export const isAuthenticated = (
  user: User | null | undefined,
): user is User => {
  if (user) return true;
  notifications.update({
    color: "red",
    title: "Oops!",
    message: "User not authenticated",
    icon: <IconAlertOctagon size="1rem" />,
    withCloseButton: true,
  });
  return false;
};
