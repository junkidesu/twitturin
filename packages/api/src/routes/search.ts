import express from "express";
import { parseString } from "../utils/parsers";
import searchService from "../services/searchService";
import { SearchResults } from "../types";

const router = express.Router();

/**
 * @openapi
 * /search:
 *   get:
 *     summary: Simple search
 *     tags: [search]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword (case-insensitive)
 *     responses:
 *       200:
 *         description: The search results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchData'
 */
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
