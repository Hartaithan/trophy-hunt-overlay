"use client";

import { useEffect, useState, type FC } from "react";
import type { ActiveGame } from "@/models/game";
import type { ActiveTrophy } from "@/models/trophy";
import { ref, onValue } from "firebase/database";
import { database } from "@/utils/firebase";
import { Flex } from "@mantine/core";
import classes from "./OverlaySection.module.css";
import { AnimatePresence, motion } from "framer-motion";
import OverlayGame from "@/components/OverlayGame/OverlayGame";
import OverlayTrophy from "@/components/OverlayTrophy/OverlayTrophy";

interface Props {
  userId: string;
}

const delay = 1000;

type Game = ActiveGame | null;
type Trophy = ActiveTrophy | null;
type Data = ActiveGame | ActiveTrophy | null;

const isSame = <T extends Data>(prev: T, next: T): T => {
  const isSame = prev?.id === next?.id;
  return isSame ? prev : next;
};

const OverlaySection: FC<Props> = (props) => {
  const { userId } = props;
  const [game, setGame] = useState<Game>(null);
  const [trophy, setTrophy] = useState<Trophy>(null);

  useEffect(() => {
    onValue(ref(database, userId), (snapshot) => {
      const data = snapshot.val();
      setGame(null);
      setTrophy(null);
      const timeout = setTimeout(() => {
        setGame((prev) => isSame<Game>(prev, data.game));
        setTrophy((prev) => isSame<Trophy>(prev, data.trophy));
        clearTimeout(timeout);
      }, delay);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex className={classes.container}>
      <AnimatePresence>
        {game && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <OverlayGame game={game} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {trophy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <OverlayTrophy trophy={trophy} />
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default OverlaySection;
