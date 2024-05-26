import { FETCH_URL } from "@/constants/variables";
import type { PageResponse } from "@/models/page";

export const fetchPage = async (url: string): Promise<PageResponse | null> => {
  try {
    const fetchURL = new URL(FETCH_URL);
    fetchURL.searchParams.set("url", url);
    const request = await fetch(fetchURL);
    const response = await request.json();
    if (!request.ok) throw Error(JSON.stringify(response));
    return response;
  } catch (error) {
    console.error("unable to fetch page", error);
    return null;
  }
};
