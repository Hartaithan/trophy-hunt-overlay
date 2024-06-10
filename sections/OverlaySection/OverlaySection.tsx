"use client";

import { useEffect, useState, type FC } from "react";
import type { ActiveGame } from "@/models/game";
import type { ActiveTrophy } from "@/models/trophy";
import { ref, onValue } from "firebase/database";
import { database } from "@/utils/firebase";
import { Flex } from "@mantine/core";

interface Props {
  userId: string;
}

const OverlaySection: FC<Props> = (props) => {
  const { userId } = props;
  const [game, setGame] = useState<ActiveGame | null>(null);
  const [trophy, setTrophy] = useState<ActiveTrophy | null>(null);

  useEffect(() => {
    onValue(ref(database, userId), (snapshot) => {
      const data = snapshot.val();
      if (data?.game !== undefined) setGame(data.game);
      if (data?.trophy !== undefined) setTrophy(data.trophy);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex h="100%" direction="column" justify="center" align="center">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        active game {JSON.stringify(game, null, 2)}
      </pre>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        active trophy {JSON.stringify(trophy, null, 2)}
      </pre>
    </Flex>
  );
};

export default OverlaySection;
