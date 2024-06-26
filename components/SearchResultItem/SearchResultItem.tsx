"use client";

import type { GameSearchResult } from "@/models/game";
import { Badge, Button, Flex, Text, Tooltip } from "@mantine/core";
import { useCallback, type FC } from "react";
import classes from "./SearchResultItem.module.css";
import GameImage from "@/components/GameImage/GameImage";
import { IconAlertOctagon, IconCheck, IconPlus } from "@tabler/icons-react";
import { addGame } from "@/actions/addGame";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/providers/AuthProvider";
import { isAuthenticated } from "@/utils/auth";
import useGameParams from "@/hooks/useGameParams";

interface Props {
  item: GameSearchResult;
}

const SearchResultItem: FC<Props> = (props) => {
  const { item } = props;
  const { user } = useAuth();
  const { isOverlay } = useGameParams(item);

  const handleAdd = useCallback(
    async (item: GameSearchResult) => {
      const { title } = item;
      if (!isAuthenticated(user)) return null;
      const id = notifications.show({
        loading: true,
        title: `Adding ${title}...`,
        message:
          "The game is being added, it shouldn't take long, don't reload the page.",
        autoClose: false,
        withCloseButton: false,
      });
      const response = await addGame(item, user);
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
    },
    [user],
  );

  return (
    <Flex className={classes.container}>
      <Flex className={classes.hero}>
        <GameImage
          src={item.image_url}
          title={item.title}
          isOverlay={isOverlay}
        />
        <Text className={classes.title} lineClamp={3}>
          {item.title}
        </Text>
      </Flex>
      <Flex className={classes.details}>
        {item.region && (
          <Tooltip label="Region">
            <Badge className={classes.badge}>{item.region}</Badge>
          </Tooltip>
        )}
        {item.platforms && (
          <Tooltip label="Platform">
            <Badge className={classes.badge}>
              {item.platforms?.join(", ")}
            </Badge>
          </Tooltip>
        )}
      </Flex>
      <Button
        size="xs"
        variant="light"
        className={classes.add}
        leftSection={<IconPlus width={18} height={18} />}
        onClick={() => handleAdd(item)}>
        Add
      </Button>
    </Flex>
  );
};

export default SearchResultItem;
