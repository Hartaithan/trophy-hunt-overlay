"use client";

import { Flex, Loader, TextInput } from "@mantine/core";
import { memo } from "react";
import type { FC } from "react";
import classes from "./SearchForm.module.css";

interface Props {
  search: string;
  isLoading: boolean;
  handleChange: (value: string) => void;
}

const SearchForm: FC<Props> = (props) => {
  const { search, isLoading, handleChange } = props;
  return (
    <Flex className={classes.container}>
      <TextInput
        placeholder="Search..."
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        rightSection={isLoading && <Loader size="xs" />}
      />
    </Flex>
  );
};

export default memo(SearchForm);
