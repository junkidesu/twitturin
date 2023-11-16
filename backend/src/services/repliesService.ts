import ReplyModel from "../models/reply";
import { NewReply, PopulatedReply, NotFoundError } from "../types";

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

  if (!editedReply) throw new NotFoundError("reply not found");

  return editedReply.populate<PopulatedReply>("author");
};

export default { replyToTweet, editReply };
