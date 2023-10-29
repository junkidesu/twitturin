import express from "express";
import usersService from "../services/usersService";
import { toNewUser } from "../utils/parsers";

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await usersService.getAllUsers();

  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const newUser = toNewUser(req.body);

    const addedUser = await usersService.addUser(newUser);

    res.status(201).json(addedUser);
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      res.status(400).json({ error: error.message });
    }
  }
});

export default router;
