import { bufferSaveUrls } from "./jsonStorage.js";

let db;

export const setUrls = (urls) => {
  db = urls;
};

export const saveUrl = (url) => {
  if (db[url.code]) {
    throw new Error("Code already exists");
  }

  const savedUrl = (db[url.code] = url);

  bufferSaveUrls(db);
  return savedUrl;
};

export const getUrl = (code) => {
  return db[code];
};

export const updateUrl = (url) => {
  const updatedUrl = (db[url.code] = url);

  bufferSaveUrls(db);
  return updatedUrl;
};
