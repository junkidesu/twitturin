import express from "express";
import { toNewTweet } from "../utils/parsers";
import tweetsService from "../services/tweetsService";
import { AuthError } from "../types";

const router = express.Router();

router.get("/", async (_req, res) => {
  const tweets = await tweetsService.getAllTweets();
  return res.json(tweets);
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) throw new AuthError("must be authenticated to post");

    const newTweet = toNewTweet({
      ...req.body,
      author: req.user._id.toString(),
    });

    const addedTweet = await tweetsService.addTweet(newTweet);

    res.status(201).send(addedTweet);
  } catch (error) {
    next(error);
  }
});

export default router;
