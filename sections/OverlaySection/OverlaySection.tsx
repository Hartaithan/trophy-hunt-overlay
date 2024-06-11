"use client";

import { useEffect, useState, type FC } from "react";
import type { ActiveGame } from "@/models/game";
import type { ActiveTrophy } from "@/models/trophy";
import { ref, onValue } from "firebase/database";
import { database } from "@/utils/firebase";
import { Flex, Transition } from "@mantine/core";

interface Props {
  userId: string;
}

const delay = 1000;

const OverlaySection: FC<Props> = (props) => {
  const { userId } = props;
  const [game, setGame] = useState<ActiveGame | null>(null);
  const [trophy, setTrophy] = useState<ActiveTrophy | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) return;
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [visible]);

  useEffect(() => {
    onValue(ref(database, userId), (snapshot) => {
      const data = snapshot.val();
      setVisible(false);
      const timeout = setTimeout(() => {
        if (data?.game !== undefined) setGame(data.game);
        if (data?.trophy !== undefined) setTrophy(data.trophy);
        clearTimeout(timeout);
      }, delay);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex h="100%" direction="column" justify="center" align="center">
      <Transition mounted={visible} keepMounted>
        {(styles) => (
          <pre style={{ ...styles, whiteSpace: "pre-wrap" }}>
            active game {JSON.stringify(game, null, 2)}
          </pre>
        )}
      </Transition>
      <Transition mounted={visible} keepMounted>
        {(styles) => (
          <pre style={{ ...styles, whiteSpace: "pre-wrap" }}>
            active trophy {JSON.stringify(trophy, null, 2)}
          </pre>
        )}
      </Transition>
    </Flex>
  );
};

export default OverlaySection;
