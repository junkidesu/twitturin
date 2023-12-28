import express from "express";
import usersService from "../services/usersService";
import { toNewUser, toEditUser, parseString } from "../utils/parsers";
import { requireAuthentication, requireSameUser } from "../utils/middleware";
import tweetsService from "../services/tweetsService";
import repliesService from "../services/repliesService";
import followService from "../services/followService";
import { upload } from "../utils/imageUpload";

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users.
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (_req, res) => {
  const users = await usersService.getAllUsers();

  res.json(users);
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user (sign up).
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: The new user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.post("/", async (req, res, next) => {
  try {
    const newUser = toNewUser(req.body);

    const addedUser = await usersService.addUser(newUser);

    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by their id.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user.
 *     responses:
 *       200:
 *         description: The user with the specified id.
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
 *         description: The user with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id", async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/profilePicture",
  requireAuthentication,
  requireSameUser,
  upload.single("picture"),
  async (req, res, next) => {
    if (!req.file) return next(new Error("picture missing"));

    try {
      const location = "location" in req.file ? req.file.location : undefined;

      const updatedUser = await usersService.updateProfilePicture(
        req.params.id,
        parseString(location)
      );
      return res.json(updatedUser);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id/profilePicture",
  requireAuthentication,
  requireSameUser,
  async (req, res, next) => {
    try {
      const updatedUser = await usersService.removeProfilePicture(req.params.id);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /users/{id}/tweets:
 *   get:
 *     summary: Get the tweets by the user with the given MongoDB id.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user.
 *     responses:
 *       200:
 *         description: The list of tweets by the given user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: The provided id is not a valid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: The user with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id/tweets", async (req, res, next) => {
  try {
    const tweets = await tweetsService.getTweetsByUser(req.params.id);

    res.json(tweets);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /users/{id}/replies:
 *   get:
 *     summary: Get the replies authored by user with the given MongoDB id.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user.
 *     responses:
 *       200:
 *         description: The list of replies by the user.
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
 *         description: The user with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id/replies", async (req, res, next) => {
  try {
    const replies = await repliesService.getUserReplies(req.params.id);
    res.json(replies);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /users/{id}/likes:
 *   get:
 *     summary: Get the tweets liked by the user with the given ID.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user.
 *     responses:
 *       200:
 *         description: The list of tweets liked by the given user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: The provided id is not a valid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: The user with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id/likes", async (req, res, next) => {
  try {
    const likedTweets = await tweetsService.getLikedTweets(req.params.id);
    res.json(likedTweets);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /users/{id}/following:
 *   get:
 *     summary: Get all the users that the user with the given ID is following.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user.
 *     responses:
 *       200:
 *         description: The list of users being followed by the given user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: The provided id is not a valid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: The user with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id/following", async (req, res, next) => {
  try {
    const following = await followService.getFollowing(req.params.id);
    res.json(following);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /users/{id}/followers:
 *   get:
 *     summary: Get all the followers of the user with the given ID.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB id of the user.
 *     responses:
 *       200:
 *         description: The list of followers of the given user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: The provided id is not a valid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: The user with the specified id was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/:id/followers", async (req, res, next) => {
  try {
    const followers = await followService.getFollowers(req.params.id);

    res.json(followers);
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Edit a user with the given id.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditUser'
 *     responses:
 *       200:
 *         description: successfully edited user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: unauthorized editing of a user (i.e., invalid JWT, or user editing someone else's profile)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.put(
  "/:id",
  requireAuthentication,
  requireSameUser,
  async (req, res, next) => {
    try {
      const toEdit = toEditUser(req.body);

      const updatedUser = await usersService.editUser(req.params.id, toEdit);

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user with the given id.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the user
 *     responses:
 *       204:
 *         description: Successfully removed the user with the given id.
 *       400:
 *         description: Invalid MongoDB id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       401:
 *         description: Invalid or missing token; user deleting someone else's profile.
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
  requireSameUser,
  async (req, res, next) => {
    try {
      await usersService.removeUser(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
