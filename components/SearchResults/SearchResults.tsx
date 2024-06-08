import type { FC } from "react";
import { memo } from "react";
import type { GameSearchResult } from "@/models/game";
import { Grid, GridCol, Text } from "@mantine/core";
import SearchResultItem from "@/components/SearchResultItem/SearchResultItem";

interface Props {
  results: GameSearchResult[] | null;
}

const SearchResults: FC<Props> = (props) => {
  const { results } = props;
  return (
    <Grid w="100%">
      {results && results.length === 0 && (
        <GridCol span={12}>
          <Text ta="center" fw="bold" mt="xl">
            Nothing found :(
          </Text>
        </GridCol>
      )}
      {results &&
        results.length > 0 &&
        results.map((result) => (
          <GridCol span={3} key={result.path}>
            <SearchResultItem item={result} />
          </GridCol>
        ))}
    </Grid>
  );
};

export default memo(SearchResults);
