"use client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useEffect, useRef, useState, type FC } from "react";
import type { ActiveGame, ActiveState } from "@/models/game";
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

const setData = <T extends Data>(
  data: T,
  ref: MutableRefObject<T>,
  setData: Dispatch<SetStateAction<T>>,
) => {
  const isSame = ref.current?.id === data?.id;
  if (isSame) return;
  setData(null as T);
  ref.current = null as T;
  const timeout = setTimeout(() => {
    setData(data);
    ref.current = data;
    clearTimeout(timeout);
  }, delay);
};

const OverlaySection: FC<Props> = (props) => {
  const { userId } = props;
  const [game, setGame] = useState<Game>(null);
  let gameRef = useRef<Game>(null);
  const [trophy, setTrophy] = useState<Trophy>(null);
  let trophyRef = useRef<Trophy>(null);

  useEffect(() => {
    onValue(ref(database, userId), (snapshot) => {
      const data: ActiveState = snapshot.val();
      setData<Game>(data.game, gameRef, setGame);
      setData<Trophy>(data.trophy, trophyRef, setTrophy);
    });
  }, [userId]);

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
