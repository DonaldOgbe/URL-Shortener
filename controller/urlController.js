import { getGeneratedCode } from "./codeGenerator.js";
import { saveUrl, getUrl, updateUrl } from "../repository/urlRepository.js";
import { Url } from "../model/Url.js";
import { getConfig } from "../config.js";



export const shortenUrl = (request, response, next) => {
  try {
    const { baseUrl } = getConfig();

    const { originalUrl } = request.body;
    let code = request.body.code;

    if (!code || code.trim() === "") {
      code = getGeneratedCode();
    }

    const url = new Url(code, originalUrl);

    const savedUrl = saveUrl(url);

    response.status(201).json({shortenUrl: `${baseUrl}/${savedUrl.code}`, ...savedUrl});
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

      response.redirect(url.originalUrl);
    } else {
      throw new Error("code does not exist");
    }
  } catch (error) {
    next(error);
  }
};
