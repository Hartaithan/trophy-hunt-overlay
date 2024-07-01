export type TrophyType = "platinum" | "gold" | "silver" | "bronze" | "total";

export interface Trophy {
  id: string;
  title: string;
  description: string;
  type: TrophyType | string;
  image_url: string | null;
  url: string | null;
}

export interface TrophyList {
  id: string;
  title: string;
  count: number;
  counts: TrophyCounts;
  trophies: Trophy[];
}

export interface TrophyCounts {
  total: number;
  platinum: number | null;
  gold: number;
  silver: number;
  bronze: number;
}

export interface TrophyListResponse {
  trophies: Trophy[];
  counts: TrophyCounts;
}

export type ActiveTrophy = Pick<
  Trophy,
  "id" | "title" | "description" | "image_url"
>;
