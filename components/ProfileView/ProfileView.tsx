"use client";

import { useCallback, type FC } from "react";
import { ActionIcon, Flex, Text, Tooltip } from "@mantine/core";
import classes from "./ProfileView.module.css";
import { useAuth } from "@/providers/AuthProvider";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { getUsername } from "@/utils/string";
import { useRouter } from "next/navigation";
import { signOut } from "@/actions/signOut";

const ProfileView: FC = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  const handleSignOut = useCallback(async () => {
    const { status } = await signOut();
    if (status === "success") push("/signIn");
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
