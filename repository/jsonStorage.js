import fs from "fs/promises";

export const loadUrls = async () => {
  try {
    const raw = await fs.readFile(".urls.json", "utf-8");

    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
};

export const loadClicks = async () => {
  try {
    const raw = await fs.readFile(".clicks.json", "utf-8");

    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
};

const saveUrls = async (urls) => {
  await fs.writeFile(".urls.json", JSON.stringify(urls, null, 2));
};

const saveClicks = async (clicks) => {
  await fs.writeFile(".clicks.json", JSON.stringify(clicks, null, 2));
};

let urlsTimeout;

export const bufferSaveUrls = (urls) => {
  clearTimeout(urlsTimeout);

  urlsTimeout = setTimeout(async () => {
    await saveUrls(urls);
  }, 200);
};

let clicksTimeout;

export const bufferSaveClicks = (clicks) => {
  clearTimeout(clicksTimeout);

  clicksTimeout = setTimeout(async () => {
    await saveClicks(clicks);
  }, 200);
};
