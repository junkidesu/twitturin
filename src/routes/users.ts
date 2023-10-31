import express from "express";
import usersService from "../services/usersService";
import { toNewUser, toEditUser } from "../utils/parsers";
import { requireAuthentication, requireSameUser } from "../utils/middleware";

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

router.put("/:id", requireAuthentication);
router.put("/:id", requireSameUser);
router.put("/:id", async (req, res, next) => {
  try {
    const toEdit = toEditUser(req.body);

    const updatedUser = await usersService.editUser(req.params.id, toEdit);

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
