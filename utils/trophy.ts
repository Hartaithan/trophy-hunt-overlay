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
  rows.each((_, row) => {
    const content = cheerio(row).find(select.trophyContent).first();
    const type =
      cheerio(row).find(select.trophyType).attr("title") || "Type not found";
    const nameElement = content.find("a");
    const name = nameElement.text().trim();
    const description = content.contents().last().text().trim();
    const url = nameElement.attr("href") ?? null;
    if (name.length !== 0 && description.length !== 0) {
      trophies.push({ name, description, type, url: SERVICE_URL + url });
    }
  });
  return trophies;
};
