"use client";

import { useState, type FC, useEffect, useCallback, useRef } from "react";
import { Button, Flex } from "@mantine/core";
import SearchForm from "@/forms/SearchForm/SearchForm";
import SearchResults from "@/components/SearchResults/SearchResults";
import type { GameSearchResult } from "@/models/game";
import { useDebouncedValue } from "@mantine/hooks";
import { searchByQuery } from "@/actions/search";
import { notifications } from "@mantine/notifications";
import { IconAlertOctagon, IconChevronRight } from "@tabler/icons-react";

const SearchSection: FC = () => {
  const [search, setSearch] = useState<string>("");
  const searchValue = useRef<string>("");
  const [debounced] = useDebouncedValue(search, 1500);
  const [results, setResults] = useState<GameSearchResult[] | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);

  const handleReset = useCallback(() => {
    setLoading(false);
    setResults([]);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      if (value.trim().length === 0) {
        handleReset();
      } else {
        setLoading(true);
      }
      setSearch(value);
      searchValue.current = value;
    },
    [handleReset, setLoading, setSearch],
  );

  const handleDebouncedChange = useCallback(async () => {
    if (debounced.trim().length === 0) return;
    const response = await searchByQuery(debounced);
    if (response?.status === "success") {
      setResults(response?.data?.results ?? []);
      setNextPage(response?.data?.nextPage ?? null);
    } else {
      notifications.show({
        color: "red",
        title: "Oops!",
        message: response?.message,
        icon: <IconAlertOctagon size="1rem" />,
        autoClose: false,
        withCloseButton: true,
      });
    }
    setLoading(false);
  }, [debounced]);

  const handleNextPage = useCallback(async (page: number) => {
    setFetching(true);
    const response = await searchByQuery(searchValue.current, page);
    if (response?.status === "success") {
      const resultsList = response?.data?.results ?? [];
      setResults((prev) => (prev ? [...prev, ...resultsList] : resultsList));
      setNextPage(response?.data?.nextPage ?? null);
    } else {
      notifications.show({
        color: "red",
        title: "Oops!",
        message: response?.message,
        icon: <IconAlertOctagon size="1rem" />,
        autoClose: false,
        withCloseButton: true,
      });
    }
    setFetching(false);
  }, []);

  useEffect(() => {
    handleDebouncedChange();
  }, [handleDebouncedChange]);

  return (
    <Flex direction="column" w="100%" gap="md" align="center">
      <SearchForm
        search={search}
        isLoading={isLoading}
        handleChange={handleChange}
      />
      <SearchResults results={results} />
      {!isLoading && results && results.length > 0 && nextPage && (
        <Button
          variant="light"
          fullWidth
          loading={isFetching}
          rightSection={<IconChevronRight size="1.25rem" />}
          onClick={() => handleNextPage(nextPage)}>
          Next page
        </Button>
      )}
    </Flex>
  );
};

export default SearchSection;
