import { getGeneratedCode } from "./codeGenerator.js";
import { saveUrl, getUrl, updateUrl } from "../repository/urlRepository.js";
import { Url } from "../model/Url.js";
import { getConfig } from "../config.js";
import { saveClick, getClicks } from "../repository/clickRepository.js";
import { Click } from "../model/Click.js"

const reservedCodes = ["code", "report"];

export const shortenUrl = (request, response, next) => {
  try {
    const { baseUrl } = getConfig();

    const { originalUrl } = request.body;
    let code = request.body.code;

    if (!code || code.trim() === "") {
      code = getGeneratedCode();
    }

    if (reservedCodes.includes(code.toLowerCase())) {
      throw new Error("This code is reserved");
    }

    const url = new Url(code, originalUrl);

    const savedUrl = saveUrl(url);

    response
      .status(201)
      .json({ shortenUrl: `${baseUrl}/${savedUrl.code}`, ...savedUrl });
  } catch (error) {
    next(error);
  }
};

export const getOriginalUrl = (request, response, next) => {
  try {
    const code = request.params.code;

    const url = getUrl(code);

    if (url) {
      url.clicks++;
      url.lastAccessedAt = new Date();
      updateUrl(url);

      const click = new Click(url.code, request.ip);
      saveClick(click);

      response.redirect(url.originalUrl);
    } else {
      throw new Error("code does not exist");
    }
  } catch (error) {
    next(error);
  }
};

export const getReport = (request, response, next) => {
  try {
    const code = request.params.code;

    const url = getUrl(code);

    if (url) {
      const clicks = getClicks(url.code);

      response.status(200).json({ url: url, clicks:  clicks});
    } else {
      throw new Error("code does not exist");
    }
  } catch (error) {
    next(error);
  }
};
