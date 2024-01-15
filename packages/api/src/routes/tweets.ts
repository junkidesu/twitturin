import express from "express";
import { toEditTweet, toNewTweet, toNewReply } from "../utils/parsers";
import tweetsService from "../services/tweetsService";
import repliesService from "../services/repliesService";
import { requireAuthentication, requireTweetAuthor } from "../utils/middleware";
import likeService from "../services/likeService";

const router = express.Router();

/**
 * @openapi
 * /tweets:
 *   get:
 *     summary: Get all tweets.
 *     tags: [tweets]
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: The MongoDB ID of the author of the tweet. If none is provided, returns all tweets.
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
router.get("/", async (req, res, next) => {
  try {
    const { author } = req.query;

    if (!author) {
      const tweets = await tweetsService.getAllTweets();
      return res.json(tweets);
    }

    const tweets = await tweetsService.getTweetsByUser(author as string);

    return res.json(tweets);
  } catch (error) {
    return next(error);
  }
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
 *             example:
 *               id: 65400f54543880dabb0a6315
 *               author:
 *                 id: 65400f54543880dabb0a6315
 *                 username: student1
 *                 fullName: John Doe
 *                 kind: student
 *                 email: johndoe@gmail.com
 *                 country: USA
 *                 age: 21
 *                 studentId: se12345
 *                 major: SE
 *               content: This is tweet content!
 *               likedBy: []
 *               likes: 0
 *               replies: []
 *               replyCount: 0
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
  requireTweetAuthor,
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
 *             $ref: '#/components/schemas/NewTweet'
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
  requireTweetAuthor,
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

/**
 * @openapi
 * /tweets/{id}/likes:
 *   get:
 *     summary: Get the users who liked the tweet.
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
 *               $ref: '#/components/schemas/User'
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
router.get("/:id/likes", async (req, res, next) => {
  try {
    const likedBy = await likeService.getTweetLikes(req.params.id);

    res.json(likedBy);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /tweets/{id}/likes:
 *   post:
 *     summary: Like a tweet with the given id.
 *     security:
 *       - bearerAuth: []
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
 *         description: Tweet liked.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: JWT missing or invalid.
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
router.post("/:id/likes", requireAuthentication, async (req, res, next) => {
  try {
    const likedTweet = await likeService.likeTweet(
      req.params.id,
      req.user!._id
    );

    res.json(likedTweet);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /tweets/{id}/likes:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [tweets]
 *     summary: Remove a like from the tweet with the given id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the tweet.
 *     responses:
 *       204:
 *         description: Like successfully removed.
 *       400:
 *         description: invalid MongoDB id or userId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: JWT missing or invalid; user removes someone else's like
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
router.delete("/:id/likes", requireAuthentication, async (req, res, next) => {
  try {
    await likeService.unlikeTweet(req.params.id, req.user!._id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /tweets/{id}/replies:
 *   get:
 *     summary: Get the replies to the tweet.
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
 *         description: The list of replies to the tweet.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reply'
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
router.get("/:id/replies", async (req, res, next) => {
  try {
    const replies = await repliesService.getRepliesByTweet(req.params.id);
    res.json(replies);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /tweets/{id}/replies:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Post a reply to the tweet with the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the tweet being replied to.
 *     tags: [tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReply'
 *     responses:
 *       201:
 *         description: The new reply.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *             example:
 *               id: 65400f54543880dabb0a6315
 *               author:
 *                 id: 65400f54543880dabb0a6315
 *                 username: student1
 *                 fullName: John Doe
 *                 kind: student
 *                 email: johndoe@gmail.com
 *                 country: USA
 *                 age: 21
 *                 studentId: se12345
 *                 major: SE
 *               content: This is a reply!
 *               tweet: 65400f54543880dabb0a6315
 *               parentTweet: 65400f54543880dabb0a6315
 *               parentReply: null
 *               likedBy: []
 *               likes: 0
 *               replies: []
 *       400:
 *         description: Invalid reply content.
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
router.post("/:id/replies", requireAuthentication, async (req, res, next) => {
  try {
    const reply = await repliesService.replyToTweet(
      req.params.id,
      toNewReply(req.body),
      req.user!._id.toString()
    );

    res.status(201).json(reply);
  } catch (error) {
    next(error);
  }
});

export default router;
