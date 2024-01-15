import express from "express";
import { parseString } from "../utils/parsers";
import searchService from "../services/searchService";
import { SearchResults } from "../types";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const keyword = parseString(req.query.keyword, "keyword");

    const results: SearchResults = await searchService.search({ keyword });

    res.json(results);
  } catch (error) {
    next(error);
  }
});

export default router;
