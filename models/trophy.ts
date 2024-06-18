export interface Trophy {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string | null;
}

export interface TrophyList {
  id: string;
  title: string;
  count: number;
  trophies: Trophy[];
}

export interface TrophyCounts {
  total: number;
  platinum: number | null;
  gold: number;
  silver: number;
  bronze: number;
}

export type ActiveTrophy = Pick<Trophy, "id" | "title">;
