import express from "express";
import usersService from "../services/usersService";
import { toNewUser, toEditUser } from "../utils/parsers";
import { requireAuthentication, requireSameUser } from "../utils/middleware";

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
router.get("/:id", async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  if (!user) return res.status(404).json({ error: "user not found" });

  return res.json(user);
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
