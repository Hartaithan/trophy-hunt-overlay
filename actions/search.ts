"use server";

import { SERVICE_URL } from "@/constants/variables";
import type { ActionResponse } from "@/models/action";
import type { GameSearchResponse, GameSearchResult } from "@/models/game";
import { fetchPage } from "@/utils/page";
import { load } from "cheerio";

const select = {
  query: "h3#breadCrumbs",
  rows: "table.zebra > tbody > tr",
  title: "td:nth-child(2) > a",
  region: "td:nth-child(2)",
  platforms: "td:nth-child(2) > div.platforms > span.platform",
  image: "td:nth-child(1) > a > img",
  active: "a.typo-button.active",
};

export const searchByQuery = async (
  query: string,
  page: number | null = null,
): Promise<ActionResponse<GameSearchResponse>> => {
  const url = new URL(`${SERVICE_URL}/search`);
  url.searchParams.set("q", encodeURI(query));
  url.searchParams.set("page", page ? page.toString() : "1");

  const content = await fetchPage(url.toString());
  if (!content) {
    console.error("unable to fetch page", url);
    return {
      status: "error",
      message: "Unable to fetch page",
    };
  }

  const cheerio = load(content.body);

  const results: GameSearchResult[] = [];
  const resultQuery = cheerio(select.query).text().split("›").pop();
  const rows = cheerio(select.rows);

  rows.each((index, result) => {
    const titleElement = cheerio(result).find(select.title);
    const title = titleElement.text().trim();

    const path = titleElement.attr("href") ?? title;
    const url = SERVICE_URL + path;
    const id = url.split("/").pop() ?? `${index}-${path}`;

    let region: string | null = null;
    const regionElement = cheerio(result).find(select.region);
    if (regionElement.children().length > 3) {
      region =
        regionElement
          .contents()
          .filter((_, node) => node.type === "text")
          .text() ?? null;
    }

    const platforms: string[] = [];
    const platformsTags = cheerio(result).find(select.platforms);
    platformsTags.each((_, platform) => {
      const value = cheerio(platform).text();
      if (value) {
        platforms.push(value);
      }
    });

    const image = cheerio(result).find(select.image);
    const image_url = image.attr("src");

    results.push({ id, path, title, url, platforms, region, image_url });
  });

  let nextPage: number | null = null;
  const activePage = cheerio(select.active);
  const nextLink = activePage.parent().next().find("a");
  if (nextLink.length > 0 && nextLink.hasClass("typo-button")) {
    const link = nextLink.attr("href") ?? "";
    const page = link.split("page=")[1];
    nextPage = page ? Number(page) : null;
  }

  const response: GameSearchResponse = {
    query,
    resultQuery,
    results,
    nextPage,
  };

  return {
    data: response,
    status: "success",
    message: `Successful search by query: ${query}!`,
  };
};
