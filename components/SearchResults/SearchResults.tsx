import type { SearchResult } from "@/models/search";
import { Grid, GridCol, Text } from "@mantine/core";
import { memo } from "react";
import type { FC } from "react";
import ResultItem from "../ResultItem/ResultItem";

interface Props {
  results: SearchResult[] | null;
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
          <GridCol span={4} key={result.path}>
            <ResultItem item={result} />
          </GridCol>
        ))}
    </Grid>
  );
};

export default memo(SearchResults);
