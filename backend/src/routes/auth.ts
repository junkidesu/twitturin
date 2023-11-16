import express from "express";
import authService from "../services/authService";
import { toCredentials } from "../utils/parsers";

const router = express.Router();

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Authenticate with student ID and password.
 *     description: Authenticate a user with student ID and password. The authentication scheme is bearer token (JWT).
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthData'
 *     responses:
 *       200:
 *         description: JWT and user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenData'
 *       400:
 *         description: invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *
 *       401:
 *         description: incorrect studentId or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.post("/", async (req, res, next) => {
  try {
    const credentials = toCredentials(req.body);

    const tokenData = await authService.authenticate(credentials);

    res.json(tokenData);
  } catch (error) {
    return next(error);
  }
});

export default router;
