import express from "express";
import authService from "../services/authService";
import { toCredentials } from "../utils/parsers";

const router = express.Router();

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
