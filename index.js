import dotenv from "dotenv";
import express from "express";
import {
  shortenUrl,
  getOriginalUrl,
  getReport,
} from "./controller/urlController.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { codeValidationMiddleware } from "./middleware/codeValidationMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/shorten", shortenUrl);

app.get("/:code", codeValidationMiddleware ,getOriginalUrl);

app.get("/:code/report", codeValidationMiddleware ,getReport);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
