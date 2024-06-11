"use server";

import { load } from "cheerio";
import { fetchPage } from "./page";
import { getTrophyList } from "./trophy";
import { baseTitle } from "@/constants/trophy";
import type { TrophyList } from "@/models/trophy";
import { SERVICE_URL } from "@/constants/variables";
import type { Game } from "@/models/game";

const select = {
  list: "#content > div.row > div.col-xs > div.box.no-top-border",
  table: "table.zebra",
  tableRows: "tbody > tr",
  title: "tbody > tr > td:nth-child(2) > span",
  titleRow: "table[style='border-bottom: 1px solid #dfdfdf;']",
  platforms: "div.platforms",
  platform: "span.platform",
  thumbnail: "div.game-image-holder",
  cover: "div#first-banner > div.img",
  guide: "div.guide-page-info > a",
};

export const fetchGame = async (
  url: string,
  lang = "en",
): Promise<Game | null> => {
  const urlWithParams = new URL(url);
  urlWithParams.searchParams.set("lang", lang);
  const urlFormatted = urlWithParams.toString();
  const id = url.split("/").pop() ?? url;

  const page = await fetchPage(urlFormatted);

  if (!page) {
    console.error("unable to fetch page", urlFormatted);
    return null;
  }

  const cheerio = load(page.body);

  let title = cheerio("title").text();
  if (title.includes("PSNProfiles.com")) {
    title = title.replace("• PSNProfiles.com", "");
    title = title.replace("Trophies", "").trim();
  }

  const platforms: string[] = [];
  const platformsTags = cheerio(select.platforms).first().find(select.platform);
  platformsTags.each((_, platform) => {
    const value = cheerio(platform).text();
    if (value) {
      platforms.push(value);
    }
  });

  const thumbnail = cheerio(select.thumbnail).find("img").attr("src") || null;

  let cover = cheerio(select.cover).attr("style") || null;
  if (cover !== null) cover = cover.replace(/.*\(|\).*/g, "");

  const listsEl = cheerio(select.list);
  const lists: TrophyList[] = [];

  let base = 0;
  let total = 0;

  listsEl.each((index, list) => {
    const haveDLC = listsEl.length > 1;
    const titleRow = cheerio(list).find(select.titleRow);
    const title = haveDLC
      ? cheerio(titleRow).find(select.title).text().trim()
      : baseTitle;
    const table = haveDLC
      ? titleRow.next()
      : listsEl.first().find(select.table);
    const rows = table.find(select.tableRows);
    const trophies = getTrophyList(cheerio, rows);
    const count = trophies.length;

    if (title === baseTitle) base = base + trophies.length;
    total = total + trophies.length;
    const id = `${index}-${title.toLowerCase().replaceAll(" ", "-")}`;

    lists.push({ id, title, count, trophies });
  });

  const guideElement = cheerio(select.guide);
  const guide =
    guideElement.length > 0 ? SERVICE_URL + guideElement.attr("href") : null;

  const response: Game = {
    id,
    title,
    platforms,
    thumbnail,
    cover,
    lists,
    counts: { base, total },
    url: urlFormatted,
    guide,
  };

  return response;
};
