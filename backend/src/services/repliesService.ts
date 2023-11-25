import ReplyModel from "../models/reply";
import { NewReply, PopulatedReply } from "../types";

const replyToReply = async (
  replyId: string,
  { content }: NewReply,
  author: string
) => {
  const savedReply = await new ReplyModel({
    content,
    to: replyId,
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
    content,
    author,
  });

  const savedReply = await reply.save();
  return savedReply.populate<PopulatedReply>("author");
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

export default { replyToTweet, replyToReply, editReply, removeReply };
