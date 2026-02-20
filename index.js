import express from "express";
import { shortenUrl } from "./controller/urlController.js";

const app = express();

app.use(express.json());

app.post("/shorten", shortenUrl);

const PORT = process.env.PORT || 3030;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});