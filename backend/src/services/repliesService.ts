import ReplyModel from "../models/reply";
import { NewReply, PopulatedReply } from "../types";

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

export default { replyToTweet };
