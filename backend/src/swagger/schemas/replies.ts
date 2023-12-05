export const Reply = {
  type: "object",
  required: [
    "id",
    "content",
    "createdAt",
    "updatedAt",
    "author",
    "likedBy",
    "likes",
    "replies",
    "replyCount",
    "tweet",
  ],
  properties: {
    id: {
      type: "string",
      format: "MongoDB id",
      example: "65400f54543880dabb0a6315",
      description: "The MongoDB id of the reply.",
    },
    author: {
      type: "object",
      $ref: "#/components/schemas/User",
      description: "The information about the author of the reply",
    },
    likedBy: {
      type: "array",
      items: {
        $ref: "#/components/schemas/User",
      },
      description: "The list of the users who liked this reply.",
    },
    likes: {
      type: "number",
      example: 2,
      description: "The number of likes of the reply.",
    },
    content: {
      type: "string",
      example: "This is tweet content!",
      description: "The content of the reply.",
    },
    tweet: {
      type: "string",
      format: "MongoDB ID",
      example: "65400f54543880dabb0a6315",
      description: "The tweet on which the reply was posted",
    },
    parentTweet: {
      type: "string",
      format: "MongoDB ID",
      example: "65400f54543880dabb0a6315",
      description:
        "The parent tweet. This property exists on replies that do not have parent replies.",
    },
    parentReply: {
      type: "string",
      format: "MongoDB ID",
      example: "65400f54543880dabb0a6315",
      description:
        "The parent reply. This property exists on replies that were left to another reply.",
    },
    replies: {
      type: "array",
      description: "The replies to this reply. Form a tree structure.",
      example: [],
    },
    createdAt: {
      type: "string",
      format: "date",
      example: "2023-12-05T09:35:52.282Z",
      description: "The time when the reply was posted.",
    },
    updatedAt: {
      type: "string",
      format: "date",
      example: "2023-12-05T09:35:52.282Z",
      description: "The time when the reply was last edited.",
    },
  },
};

export const NewReply = {
  type: "object",
  required: ["content"],
  properties: {
    content: {
      type: "string",
      example: "This is a reply!",
      description: "The content of the reply.",
    },
  },
};
