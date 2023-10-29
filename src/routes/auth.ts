import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import env from "../utils/config";
import jwt from "jsonwebtoken";
import { toCredentials } from "../utils/parsers";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { studentId, password } = toCredentials(req.body);
    const user = await User.findOne({ studentId });

    if (!user) return res.status(404).json({ error: "user not found" });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect)
      res.status(401).json({ error: "username or password incorrect" });

    const userForToken = {
      username: user.username,
      id: user._id,
      studentId: user.studentId,
    };

    const token = jwt.sign(userForToken, env.SECRET);

    return res.json({
      username: user.username,
      id: user._id,
      studentId: user.studentId,
      token,
    });
  } catch (error) {
    let errorMessage = "an error occurred: ";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({ error: errorMessage });
  }
});

export default router;
