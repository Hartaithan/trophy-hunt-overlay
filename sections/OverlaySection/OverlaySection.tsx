"use client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useEffect, useRef, useState, type FC } from "react";
import type { ActiveGame, ActiveState } from "@/models/game";
import type { ActiveTrophy } from "@/models/trophy";
import { ref, onValue } from "firebase/database";
import { database } from "@/utils/firebase";
import { Flex } from "@mantine/core";
import classes from "./OverlaySection.module.css";
import OverlayGame from "@/components/OverlayGame/OverlayGame";
import OverlayTrophy from "@/components/OverlayTrophy/OverlayTrophy";
import type { Position } from "@/models/settings";
import clsx from "clsx";

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
  const [position] = useState<Position>("top-left");

  useEffect(() => {
    onValue(ref(database, userId), (snapshot) => {
      const data: ActiveState = snapshot.val();
      setData<Game>(data.game, gameRef, setGame);
      setData<Trophy>(data.trophy, trophyRef, setTrophy);
    });
  }, [userId]);

  return (
    <Flex className={classes.container}>
      <Flex className={clsx(classes.content, classes[position])}>
        <OverlayGame className={classes.game} game={game} />
        <OverlayTrophy className={classes.trophy} trophy={trophy} />
      </Flex>
    </Flex>
  );
};

export default OverlaySection;
