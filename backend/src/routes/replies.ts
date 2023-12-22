import express from "express";
import { toNewReply } from "../utils/parsers";
import repliesService from "../services/repliesService";
import { requireAuthentication, requireReplyAuthor } from "../utils/middleware";
import likeService from "../services/likeService";

const router = express.Router();

/**
 * @openapi
 * /replies/{id}/likes:
 *   get:
 *     summary: Get the users who liked the reply.
 *     tags: [replies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the reply.
 *     responses:
 *       200:
 *         description: The list of MongoDB ids of the users who liked the reply.
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
 *         description: The reply with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id/likes", async (req, res, next) => {
  try {
    const likedBy = await likeService.getReplyLikes(req.params.id);

    res.json(likedBy);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /replies/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Post a reply to another reply with the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the parent reply.
 *     tags: [replies]
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
 *               parentTweet: null
 *               parentReply: 65400f54543880dabb0a6315
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
router.post("/:id", requireAuthentication, async (req, res, next) => {
  try {
    const addedReply = await repliesService.replyToReply(
      req.params.id,
      toNewReply(req.body),
      req.user!._id.toString()
    );

    res.status(201).json(addedReply);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /replies/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Edit a reply with the given id.
 *     tags: [replies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the reply.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReply'
 *     responses:
 *       200:
 *         description: Reply successfully edited.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *       400:
 *         description: invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: JWT missing or invalid; reply edited not by author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: Reply with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.put(
  "/:id",
  requireAuthentication,
  requireReplyAuthor,
  async (req, res, next) => {
    try {
      const editedReply = await repliesService.editReply(
        req.params.id,
        toNewReply(req.body)
      );
      res.json(editedReply);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /replies/{id}:
 *   delete:
 *     tags: [replies]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a reply with the given id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the reply.
 *     responses:
 *       204:
 *         description: Successfully removed the reply with the given id.
 *       400:
 *         description: Invalid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: Invalid or missing token; reply not being removed by author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: Reply with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *
 */
router.delete(
  "/:id",
  requireAuthentication,
  requireReplyAuthor,
  async (req, res, next) => {
    try {
      await repliesService.removeReply(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /replies/{id}/likes:
 *   post:
 *     summary: Like a reply with the given id.
 *     security:
 *       - bearerAuth: []
 *     tags: [replies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the reply.
 *     responses:
 *       200:
 *         description: Reply liked.
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
 *         description: Reply with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.post("/:id/likes", requireAuthentication, async (req, res, next) => {
  try {
    const like = await likeService.likeReply(req.params.id, req.user!._id);

    res.json(like);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /replies/{id}/likes:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [replies]
 *     summary: Remove a like from the reply with the given id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the reply.
 *     responses:
 *       204:
 *         description: Like successfully removed.
 *       400:
 *         description: invalid MongoDB id
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
 *         description: Reply with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *
 */
router.delete("/:id/likes", requireAuthentication, async (req, res, next) => {
  try {
    await likeService.unlikeReply(req.params.id, req.user!._id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
