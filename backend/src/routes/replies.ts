import express from "express";
import { toNewReply } from "../utils/parsers";
import repliesService from "../services/repliesService";
import { requireAuthentication } from "../utils/middleware";

const router = express.Router();

router.put("/:id", requireAuthentication, async (req, res, next) => {
  try {
    const editedReply = await repliesService.editReply(
      req.params.id,
      toNewReply(req.body)
    );
    res.json(editedReply);
  } catch (error) {
    next(error);
  }
});

export default router;
