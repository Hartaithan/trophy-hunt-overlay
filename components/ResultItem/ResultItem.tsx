"use client";

import type { SearchResult } from "@/models/search";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { useCallback, type FC } from "react";
import classes from "./ResultItem.module.css";
import ResultImage from "@/components/ResultImage/ResultImage";
import { IconAlertOctagon, IconCheck, IconPlus } from "@tabler/icons-react";
import { addGame } from "@/actions/addGame";
import { notifications } from "@mantine/notifications";

interface Props {
  item: SearchResult;
}

const ResultItem: FC<Props> = (props) => {
  const { item } = props;

  const handleAdd = useCallback(async (item: SearchResult) => {
    const { name } = item;
    const id = notifications.show({
      loading: true,
      title: `Adding ${name}...`,
      message:
        "The game is being added, it shouldn't take long, don't reload the page.",
      autoClose: false,
      withCloseButton: false,
    });
    const response = await addGame(item);
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
  }, []);

  return (
    <Flex className={classes.container}>
      <ResultImage item={item} />
      <Flex className={classes.content}>
        <Text className={classes.name}>
          {item.name}
          {item.region && (
            <Text className={classes.name} component="span">
              &nbsp;{`• ${item.region}`}
            </Text>
          )}
        </Text>
        {item.platforms && (
          <Text className={classes.platform}>{item.platforms?.join(", ")}</Text>
        )}
      </Flex>
      <ActionIcon className={classes.button} onClick={() => handleAdd(item)}>
        <IconPlus width={18} height={18} />
        <Text>Add</Text>
      </ActionIcon>
    </Flex>
  );
};

export default ResultItem;
