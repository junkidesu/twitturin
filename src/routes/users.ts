import express from "express";
import usersService from "../services/usersService";
import { NewUser } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  usersService
    .getAllUsers()
    .then((users) => res.json(users))
    .catch((error) => console.log(error));
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body as NewUser;

    const addedUser = await usersService.addUser(newUser);

    res.status(201).json(addedUser);
  } catch (error) {
    console.log(error);
  }
});

export default router;
