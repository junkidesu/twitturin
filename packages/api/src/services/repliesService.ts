import ReplyModel from "../models/reply";
import { NewReply, NotFoundError, PopulatedReply } from "../types";

const getAllReplies = async () => {
  const replies = await ReplyModel.find({});

  return replies;
};

const getRepliesByTweet = async (tweetId: string) => {
  const replies = await ReplyModel.find({
    parentTweet: tweetId,
  });

  return replies;
};

const getUserReplies = async (userId: string) => {
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
    tweet: foundReply.tweet,
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
  return savedReply;
};

const editReply = async (id: string, toEdit: NewReply) => {
  const editedReply = await ReplyModel.findByIdAndUpdate(id, toEdit, {
    runValidators: true,
    context: "query",
    new: true,
  });

  if (!editedReply) throw new NotFoundError("reply not found");

  return editedReply;
};

const removeReply = async (id: string) => {
  await ReplyModel.findByIdAndDelete(id);
};

export default {
  getAllReplies,
  getRepliesByTweet,
  getUserReplies,
  replyToTweet,
  replyToReply,
  editReply,
  removeReply,
};
