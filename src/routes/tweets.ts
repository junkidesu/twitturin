import express from "express";
import { toEditTweet, toNewTweet } from "../utils/parsers";
import tweetsService from "../services/tweetsService";
import { NotFoundError } from "../types";
import { requireAuthentication, requireAuthor } from "../utils/middleware";

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

router.post("/", requireAuthentication);
router.post("/", async (req, res, next) => {
  try {
    const newTweet = toNewTweet({
      ...req.body,
      author: req.user!._id.toString(),
    });

    const addedTweet = await tweetsService.addTweet(newTweet);

    res.status(201).send(addedTweet);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireAuthentication);
router.delete("/:id", requireAuthor);
router.delete("/:id", async (req, res, next) => {
  try {
    await tweetsService.removeTweet(req.params.id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireAuthentication);
router.put("/:id", requireAuthor);
router.put("/:id", async (req, res, next) => {
  try {
    const toEdit = toEditTweet(req.body);

    const updatedTweet = await tweetsService.editTweet(
      req.params.id,
      toEdit,
    );

    res.json(updatedTweet);
  } catch (error) {
    next(error);
  }
});

export default router;