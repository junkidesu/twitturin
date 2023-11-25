import express from "express";
import { toNewReply } from "../utils/parsers";
import repliesService from "../services/repliesService";
import { requireAuthentication, requireReplyAuthor } from "../utils/middleware";

const router = express.Router();

router.post("/:id", requireAuthentication, async (req, res, next) => {
  try {
    const addedReply = await repliesService.replyToReply(
      req.params.id,
      toNewReply(req.body),
      req.user!._id.toString()
    );

    res.status(201).json(addedReply);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  requireAuthentication,
  requireReplyAuthor,
  async (req, res, next) => {
    try {
      const editedReply = await repliesService.editReply(
        req.params.id,
        toNewReply(req.body)
      );
      res.json(editedReply);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  requireAuthentication,
  requireReplyAuthor,
  async (req, res, next) => {
    try {
      await repliesService.removeReply(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
