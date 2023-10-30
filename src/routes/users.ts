import express from "express";
import usersService from "../services/usersService";
import { toNewUser } from "../utils/parsers";

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await usersService.getAllUsers();

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  if (!user) return res.status(404).json({ error: "user not found" });

  return res.json(user);
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = toNewUser(req.body);

    const addedUser = await usersService.addUser(newUser);

    res.status(201).json(addedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
