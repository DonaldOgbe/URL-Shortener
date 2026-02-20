import dotenv from "dotenv";
import express from "express";
import { shortenUrl, getOriginalUrl, getReport } from "./controller/urlController.js";


dotenv.config();

const app = express();

app.use(express.json());

app.post("/shorten", shortenUrl);

app.get("/:code", getOriginalUrl)

app.get("/:code/report", getReport)

const PORT = process.env.PORT || 3030;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});