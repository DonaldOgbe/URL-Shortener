const reservedCodes = ["code", "report"];

export const codeValidationMiddleware = (request, response, next) => {
    const code = request.params.code;

    if (!code || code.trim() === "") {
      return next(new Error("Code parameter is required"));
    }

    if (reservedCodes.includes(code.toLowerCase())) {
      return next(new Error("This code is reserved"));
    }

    next();
}