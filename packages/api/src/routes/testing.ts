import express from "express";
import {
  resetDb,
} from "../utils/testHelper";

const router = express.Router();

router.post("/reset", async (_req, res) => {
  await resetDb();

  res.end();
});

export default router;
