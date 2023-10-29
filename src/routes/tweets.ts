import express from "express";
import tweetsService from "../services/tweetsService";

const router = express.Router();

router.get("/", async (_req, res) => {
  const tweets = await tweetsService.getAllTweets();
  return res.json(tweets);
});

export default router;
