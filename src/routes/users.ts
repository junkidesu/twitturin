import express from "express";
import usersService from "../services/usersService";

const router = express.Router();

router.get("/", (_req, res) => {
  usersService
    .getAllUsers()
    .then((users) => res.json(users))
    .catch((error) => console.log(error));
});

export default router;
