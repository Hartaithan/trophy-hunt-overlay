"use client";

import { Button, Flex, Text } from "@mantine/core";
import { useCallback, type FC } from "react";
import classes from "./ActiveGame.module.css";
import type { Game } from "@/models/game";
import type { Trophy } from "@/models/trophy";
import GameImage from "@/components/GameImage/GameImage";
import { notifications } from "@mantine/notifications";
import { setActive } from "@/actions/setActive";
import { useAuth } from "@/providers/AuthProvider";
import { IconAlertOctagon, IconCheck } from "@tabler/icons-react";

interface Props {
  activeGame: Game | null;
  activeTrophy: Trophy | null;
}

const ActiveGame: FC<Props> = (props) => {
  const { activeGame, activeTrophy } = props;
  const { user } = useAuth();

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    if (!activeGame) return;
    if (!activeTrophy) return;
    const id = notifications.show({
      loading: true,
      title: "Setting active state...",
      message: "It shouldn't take long, don't reload the page.",
      autoClose: false,
      withCloseButton: false,
    });
    const response = await setActive(user.uid, activeGame, activeTrophy);
    if (response?.status === "success") {
      notifications.update({
        id,
        loading: false,
        title: "Success!",
        message: response?.message,
        icon: <IconCheck size="1rem" />,
        autoClose: 2000,
      });
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
  }, [activeGame, activeTrophy, user]);

  if (!activeGame) {
    return (
      <Flex className={classes.container}>
        <Text>Pick active game!</Text>
      </Flex>
    );
  }

  return (
    <Flex className={classes.container}>
      <GameImage
        className={classes.image}
        src={activeGame.thumbnail}
        name={activeGame.title}
        isOverlay={activeGame.platforms.includes("PS5")}
        imageProps={{ fill: true }}
      />
      <Text className={classes.title}>{activeGame.title}</Text>
      <Button
        mt="md"
        disabled={!activeGame || !activeTrophy}
        onClick={handleSubmit}>
        Save
      </Button>
    </Flex>
  );
};

export default ActiveGame;
