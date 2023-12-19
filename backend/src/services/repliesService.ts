import { Types } from "mongoose";
import ReplyModel from "../models/reply";
import { NewReply, NotFoundError, PopulatedReply, User } from "../types";

const getAllReplies = async () => {
  const replies = await ReplyModel.find({});

  return replies;
};

const getRepliesByTweet = async (tweetId: string) => {
  const replies = await ReplyModel.find({
    parentTweet: tweetId,
  }).populate<PopulatedReply>("author");

  return replies;
};

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

const likeReply = async (id: string, user: User & { _id: Types.ObjectId }) => {
  const foundReply = await ReplyModel.findById(id);

  if (!foundReply) throw new NotFoundError("reply not found");

  const likesStrings = foundReply.likedBy.map((u) => u.toString());
  const likedByMe = likesStrings.includes(user._id.toString());

  if (!likedByMe) foundReply.likedBy = foundReply.likedBy.concat(user._id);

  const likedReply = await foundReply.save();

  return likedReply;
};

const removeLike = async (id: string, userId: Types.ObjectId) => {
  const reply = await ReplyModel.findById(id);

  reply!.likedBy = reply!.likedBy.filter(
    (u) => u.toString() !== userId.toString()
  );

  await reply!.save({ timestamps: { updatedAt: false } });
};

const getLikes = async (id: string) => {
  const foundReply = await ReplyModel.findById(id).populate<{
    likedBy: User[];
  }>("likedBy");

  if (!foundReply) throw new NotFoundError("reply not found");

  return foundReply.likedBy;
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
  getAllReplies,
  getRepliesByTweet,
  getRepliesByUser,
  replyToTweet,
  replyToReply,
  likeReply,
  getLikes,
  removeLike,
  editReply,
  removeReply,
};
