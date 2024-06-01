import type { FC } from "react";
import type { FetchGameResponse } from "@/models/game";

interface Props {
  games: FetchGameResponse[];
}

const GamesControl: FC<Props> = (props) => {
  const { games } = props;
  return (
    <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
      {JSON.stringify(games, null, 2)}
    </pre>
  );
};

export default GamesControl;
