import { getUrl } from "../repository/urlRepository.js";

let code;

const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

export const getGeneratedCode = () => {
  do {
    code = generateCode();
  } while (getUrl(code));

  return code;
};
