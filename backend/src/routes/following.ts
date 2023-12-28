import express from "express";
import { requireAuthentication } from "../utils/middleware";
import followService from "../services/followService";

const router = express.Router();
/**
 * @openapi
 * /following/{id}:
 *   post:
 *     summary: Follow a user.
 *     security:
 *       - bearerAuth: []
 *     tags: [following]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user to follow.
 *     responses:
 *       201:
 *         description: The user that has just been followed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid MongoDB ID of the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: JWT missing or invalid; user tries to follow themselves
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: User with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.post(
  "/:id",
  requireAuthentication,
  async (req, res, next) => {
    try {
      const followedUser = await followService.followUser(
        req.user!._id,
        req.params.id
      );
      res.status(201).json(followedUser);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /following/{id}:
 *   delete:
 *     summary: Unfollow a user.
 *     security:
 *       - bearerAuth: []
 *     tags: [following]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user to unfollow.
 *     responses:
 *       204:
 *         description: The user that has just been followed.
 *       400:
 *         description: Invalid MongoDB ID of the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: User with the given MongoDB id not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.delete(
    "/:id",
    requireAuthentication,
    async (req, res, next) => {
      try {
        await followService.unfollowUser(req.user!._id, req.params.id);
  
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
export default router;
