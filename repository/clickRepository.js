let db = {};

export const saveClick = (click) => {
  const code = click.code;

  if (!db[code]) {
    db[code] = [];
  }

  db[code].push(click);
};

export const getClicks = (code) => {
  return db[code];
};
