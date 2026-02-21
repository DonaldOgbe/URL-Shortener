import { bufferSaveClicks } from "./jsonStorage.js";

let db;

export const setClicks = (clicks) => {
    db = clicks;
}

export const saveClick = (click) => {
  const code = click.code;

  if (!db[code]) {
    db[code] = [];
  }

  db[code].push(click);

  bufferSaveClicks(db);
};

export const getClicks = (code) => {
  return db[code];
};
