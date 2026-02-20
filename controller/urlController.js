import { getGeneratedCode } from "./codeGenerator.js";
import { saveUrl } from "../repository/urlRepository.js";
import { Url } from "../model/Url.js";

export const shortenUrl = (request, response, next) => {
  try {
      const { originalUrl } = request.body;
      let code = request.body.code;
    
      if (!code || code.trim() === "") {
          code = getGeneratedCode();
      }
        
    const url = new Url(code, originalUrl);

    const savedUrl = saveUrl(url);

    response.status(201).json(savedUrl);
  } catch (error) {
    next(error);
  }
};
