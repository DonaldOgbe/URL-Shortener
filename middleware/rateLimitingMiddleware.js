const ipStore = {};
const LIMIT = 5;
const ONE_HOUR = 60 * 60 * 1000;

export const rateLimitingMiddleware = (request, response, next) => {
  const ip = request.ip;
  const now = Date.now();

  if (!ipStore[ip]) {
    ipStore[ip] = [];
  }

  ipStore[ip] = ipStore[ip].filter((timestamp) => now - timestamp < ONE_HOUR);

  if (ipStore[ip].length >= LIMIT) {
    return response.status(429).json({
      message: "Too many requests",
    });
  }

  ipStore[ip].push(now);

  next();
};
