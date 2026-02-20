
let db = {};

export const saveUrl = (url) => {
    if (db[url.code]) {
        throw new Error("Code already exists");
    }

    return db[url.code] = url;
 }

export const getUrl = (code) => {
    return db[code];
 }