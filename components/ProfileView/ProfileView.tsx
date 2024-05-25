"use client";

import { useCallback, type FC } from "react";
import { ActionIcon, Flex, Text, Tooltip } from "@mantine/core";
import classes from "./ProfileView.module.css";
import { useAuth } from "@/providers/AuthProvider";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { getUsername } from "@/utils/string";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions/signOut";
import { notifications } from "@mantine/notifications";
import { IconAlertOctagon, IconCheck } from "@tabler/icons-react";

const ProfileView: FC = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  const handleSignOut = useCallback(async () => {
    const id = notifications.show({
      loading: true,
      title: "Signing out...",
      message: "It shouldn't take long, don't reload the page.",
      autoClose: false,
      withCloseButton: false,
    });
    const response = await signOut();
    if (response?.status === "success") {
      notifications.update({
        id,
        loading: false,
        title: "Success!",
        message: response?.message,
        icon: <IconCheck size="1rem" />,
        autoClose: 2000,
      });
      push("/signIn");
    } else {
      notifications.update({
        id,
        loading: false,
        color: "red",
        title: "Something went wrong!",
        message: response?.message,
        icon: <IconAlertOctagon size="1rem" />,
        withCloseButton: true,
      });
    }
  }, [push]);

  return (
    <Flex className={classes.container}>
      <IconUserCircle size="2rem" />
      <Text className={classes.username} lineClamp={3}>
        {getUsername(user?.email)}
      </Text>
      <Tooltip label="Sign Out">
        <ActionIcon
          variant="light"
          className={classes.signOut}
          onClick={handleSignOut}>
          <IconLogout />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export default ProfileView;
