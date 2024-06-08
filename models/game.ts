import type { TrophyCounts, TrophyList } from "./trophy";

export interface GameSearchResult {
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
  title: string;
  platforms: string[];
  thumbnail: string | null;
  cover: string | null;
  lists: TrophyList[];
  counts: TrophyCounts;
  page: string;
  guide: string | null;
  message?: string;
}
