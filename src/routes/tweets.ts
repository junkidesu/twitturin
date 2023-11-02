import express from "express";
import { toEditTweet, toNewTweet } from "../utils/parsers";
import tweetsService from "../services/tweetsService";
import { NotFoundError } from "../types";
import { requireAuthentication, requireAuthor } from "../utils/middleware";

const router = express.Router();

/**
 * @openapi
 * /tweets:
 *   get:
 *     summary: Get all tweets.
 *     tags: [tweets]
 *     responses:
 *       200:
 *         description: The list of all tweets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tweet'
 */
router.get("/", async (_req, res) => {
  const tweets = await tweetsService.getAllTweets();
  return res.json(tweets);
});

/**
 * @openapi
 * /tweets/{id}:
 *   get:
 *     summary: Get a specific tweet by its id.
 *     tags: [tweets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the tweet.
 *     responses:
 *       200:
 *         description: The tweet with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: The provided id is not a valid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: The tweet with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id", async (req, res, next) => {
  try {
    const tweet = await tweetsService.getTweetById(req.params.id);

    if (!tweet) throw new NotFoundError("tweet not found");

    res.json(tweet);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /tweets:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Post a new tweet.
 *     tags: [tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTweet'
 *     responses:
 *       201:
 *         description: The new tweet.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: Invalid tweet content.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: Invalid or missing JWT.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.post("/", requireAuthentication, async (req, res, next) => {
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

/**
 * @swagger
 * /tweets/{id}:
 *   delete:
 *     tags: [tweets]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a tweet with the given id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the tweet.
 *     responses:
 *       204:
 *         description: Successfully removed the tweet with the given id.
 *       400:
 *         description: Invalid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: Invalid or missing token; tweet not being removed by author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: Tweet with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *
 */
router.delete(
  "/:id",
  requireAuthentication,
  requireAuthor,
  async (req, res, next) => {
    try {
      await tweetsService.removeTweet(req.params.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /tweets/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Edit a tweet with the given id.
 *     tags: [tweets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the tweet.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTweet'
 *     responses:
 *       200:
 *         description: Tweet successfully edited.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: JWT missing or invalid; tweet edited not by author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: Tweet with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.put(
  "/:id",
  requireAuthentication,
  requireAuthor,
  async (req, res, next) => {
    try {
      const toEdit = toEditTweet(req.body);

      const updatedTweet = await tweetsService.editTweet(req.params.id, toEdit);

      res.json(updatedTweet);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/likes", requireAuthentication, async (req, res, next) => {
  try {
    const likedTweet = await tweetsService.likeTweet(req.params.id, req.user!._id);

    res.json(likedTweet);
  } catch (error) {
    next(error);
  }
});

export default router;
