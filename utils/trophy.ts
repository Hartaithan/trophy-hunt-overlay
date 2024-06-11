import { SERVICE_URL } from "@/constants/variables";
import type { Trophy } from "@/models/trophy";
import type { Cheerio, CheerioAPI, Element } from "cheerio";

const select = {
  trophyContent: "td:nth-child(2)",
  trophyType: "td:nth-child(6) > span > img",
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
