"use client";

import type { SearchResult } from "@/models/search";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { useCallback, type FC } from "react";
import classes from "./ResultItem.module.css";
import ResultImage from "@/components/ResultImage/ResultImage";
import { IconPlus } from "@tabler/icons-react";

interface Props {
  item: SearchResult;
}

const ResultItem: FC<Props> = (props) => {
  const { item } = props;

  const handleAdd = useCallback(async (item: SearchResult) => {
    console.info("item", item);
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
