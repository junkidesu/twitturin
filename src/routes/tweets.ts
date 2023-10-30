import express from "express";
import { toNewTweet } from "../utils/parsers";
import tweetsService from "../services/tweetsService";
import { AuthError, NotFoundError } from "../types";

const router = express.Router();

router.get("/", async (_req, res) => {
  const tweets = await tweetsService.getAllTweets();
  return res.json(tweets);
});

router.get("/:id", async (req, res, next) => {
  try {
    const tweet = await tweetsService.getTweetById(req.params.id);

    if (!tweet) throw new NotFoundError("tweet not found");

    res.json(tweet);
  } catch (error) {
    next(error);
  }
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

router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.user) throw new AuthError("authentication required");

    const userId = req.user._id.toString();

    await tweetsService.removeTweet(req.params.id, userId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
