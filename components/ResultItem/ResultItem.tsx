"use client";

import type { SearchResult } from "@/models/search";
import { Badge, Button, Flex, Text, Tooltip } from "@mantine/core";
import { useCallback, type FC } from "react";
import classes from "./ResultItem.module.css";
import GameImage from "@/components/GameImage/GameImage";
import { IconAlertOctagon, IconCheck, IconPlus } from "@tabler/icons-react";
import { addGame } from "@/actions/addGame";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/providers/AuthProvider";
import { isAuthenticated } from "@/utils/auth";

interface Props {
  item: SearchResult;
}

const ResultItem: FC<Props> = (props) => {
  const { item } = props;
  const { user } = useAuth();
  const isOverlay = item.platforms ? item?.platforms.includes("PS5") : false;

  const handleAdd = useCallback(
    async (item: SearchResult) => {
      const { name } = item;
      if (!isAuthenticated(user)) return null;
      const id = notifications.show({
        loading: true,
        title: `Adding ${name}...`,
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
          name={item.name}
          isOverlay={isOverlay}
        />
        <Text className={classes.name} lineClamp={3}>
          {item.name}
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

export default ResultItem;
