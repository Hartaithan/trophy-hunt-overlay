export interface Trophy {
  id: string;
  name: string;
  description: string;
  type: string;
  url: string | null;
}

export interface TrophyList {
  id: string;
  name: string;
  count: number;
  trophies: Trophy[];
}

export interface TrophyCounts {
  base: number;
  total: number;
}
