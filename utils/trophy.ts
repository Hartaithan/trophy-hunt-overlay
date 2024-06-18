import { SERVICE_URL } from "@/constants/variables";
import type { Trophy, TrophyCounts } from "@/models/trophy";
import type { Cheerio, CheerioAPI, Element } from "cheerio";

const select = {
  trophyContent: "td:nth-child(2)",
  trophyType: "td:nth-child(6) > span > img",
  gameCounts:
    "#content > div.row > div.col-xs-4.col-xs-max-320 > div.box.no-top-border div.trophy-count",
};

export const getTrophyList = (
  cheerio: CheerioAPI,
  rows: Cheerio<Element>,
): Trophy[] => {
  const trophies: Trophy[] = [];
  rows.each((index, row) => {
    const content = cheerio(row).find(select.trophyContent).first();
    const type =
      cheerio(row).find(select.trophyType).attr("title") || "Type not found";
    const titleElement = content.find("a");
    const title = titleElement.text().trim();
    const description = content.contents().last().text().trim();
    const url = titleElement.attr("href") ?? null;
    let id = `${index}-${title.toLowerCase().replaceAll(" ", "-")}`;
    if (url) id = url.split("/").pop() ?? id;
    if (title.length !== 0 && description.length !== 0) {
      trophies.push({ id, title, description, type, url: SERVICE_URL + url });
    }
  });
  return trophies;
};

export const getGameTrophyCounts = (cheerio: CheerioAPI): TrophyCounts => {
  const counts: TrophyCounts = {
    total: 0,
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
  };
  const countsEl = cheerio(select.gameCounts);

  const totalEl = countsEl.find("span.small-info > b:nth-child(1)");
  if (totalEl.length > 0) counts.total = Number(totalEl.text());

  const platinumEl = countsEl.find("li.platinum");
  if (platinumEl.length > 0) counts.platinum = Number(platinumEl.text());

  const goldEl = countsEl.find("li.gold");
  if (goldEl.length > 0) counts.gold = Number(goldEl.text());

  const silverEl = countsEl.find("li.silver");
  if (silverEl.length > 0) counts.silver = Number(silverEl.text());

  const bronzeEl = countsEl.find("li.bronze");
  if (bronzeEl.length > 0) counts.bronze = Number(bronzeEl.text());

  return counts;
};

export const getTrophyListCounts = (cheerio: CheerioAPI): TrophyCounts => {
  const counts: TrophyCounts = {
    total: 0,
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
  };
  const countsEl = cheerio(select.gameCounts);

  const totalEl = countsEl.find("span.small-info > b:nth-child(1)");
  if (totalEl.length > 0) counts.total = Number(totalEl.text());

  const platinumEl = countsEl.find("li.platinum");
  if (platinumEl.length > 0) counts.platinum = Number(platinumEl.text());

  const goldEl = countsEl.find("li.gold");
  if (goldEl.length > 0) counts.gold = Number(goldEl.text());

  const silverEl = countsEl.find("li.silver");
  if (silverEl.length > 0) counts.silver = Number(silverEl.text());

  const bronzeEl = countsEl.find("li.bronze");
  if (bronzeEl.length > 0) counts.bronze = Number(bronzeEl.text());

  return counts;
};
