import type { TrophyCounts, TrophyList } from "./trophy";

export interface GameSearchResult {
  id: string;
  path: string;
  name: string;
  platforms?: string[];
  region: string | null;
  image_url: string | undefined;
  url: string;
}

export interface GameSearchResponse {
  query: string;
  resultQuery: string | undefined;
  results: GameSearchResult[];
  nextPage: number | null;
}

export interface Game {
  id: string;
  url: string;
  title: string;
  platforms: string[];
  thumbnail: string | null;
  cover: string | null;
  lists: TrophyList[];
  counts: TrophyCounts;
  guide: string | null;
  message?: string;
}
