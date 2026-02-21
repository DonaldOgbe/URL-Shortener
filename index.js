import dotenv from "dotenv";
import express from "express";
import {
  shortenUrl,
  getOriginalUrl,
  getReport,
} from "./controller/urlController.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { codeValidationMiddleware } from "./middleware/codeValidationMiddleware.js";
import { rateLimitingMiddleware } from "./middleware/rateLimitingMiddleware.js"
import { loadUrls, loadClicks } from "./repository/jsonStorage.js";
import { setUrls } from "./repository/urlRepository.js";
import { setClicks } from "./repository/clickRepository.js"

dotenv.config();

const [urls, clicks] = await Promise.all([
  loadUrls(), 
  loadClicks(),
])

setUrls(urls);
setClicks(clicks);

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.post("/shorten", rateLimitingMiddleware, shortenUrl);

app.get("/:code", codeValidationMiddleware ,getOriginalUrl);

app.get("/:code/report", codeValidationMiddleware ,getReport);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
