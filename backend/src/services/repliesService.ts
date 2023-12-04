import { Types } from "mongoose";
import ReplyModel from "../models/reply";
import { NewReply, NotFoundError, PopulatedReply } from "../types";

const getRepliesByUser = async (userId: string) => {
  const replies = await ReplyModel.find({ author: userId });

  return replies;
};

const replyToReply = async (
  replyId: string,
  { content }: NewReply,
  author: string
) => {
  const foundReply = await ReplyModel.findById(replyId);

  if (!foundReply) throw new NotFoundError("reply not found");

  const savedReply = await new ReplyModel({
    content,
    tweet: foundReply?.tweet,
    parentReply: replyId,
    author,
  }).save();

  return savedReply.populate<PopulatedReply>("author");
};

const replyToTweet = async (
  tweet: string,
  { content }: NewReply,
  author: string
) => {
  const reply = new ReplyModel({
    tweet,
    parentTweet: tweet,
    content,
    author,
  });

  const savedReply = await reply.save();
  return savedReply.populate<PopulatedReply>("author");
};

const likeReply = async (id: string, userId: Types.ObjectId) => {
  const foundReply = await ReplyModel.findById(id);

  if (!foundReply) throw new NotFoundError("reply not found");

  const likesStrings = foundReply.likedBy.map((u) => u.toString());

  if (!likesStrings.includes(userId.toString()))
    foundReply.likedBy = foundReply.likedBy.concat(userId);

  const likedReply = await foundReply.save();

  return likedReply;
};

const editReply = async (id: string, toEdit: NewReply) => {
  const editedReply = await ReplyModel.findByIdAndUpdate(id, toEdit, {
    runValidators: true,
    context: "query",
    new: true,
  });

  return editedReply!.populate<PopulatedReply>("author");
};

const removeReply = async (id: string) => {
  await ReplyModel.findByIdAndDelete(id);
};

export default {
  getRepliesByUser,
  replyToTweet,
  replyToReply,
  likeReply,
  editReply,
  removeReply,
};
