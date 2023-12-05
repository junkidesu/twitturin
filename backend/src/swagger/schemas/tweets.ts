export const Tweet = {
  type: "object",
  required: [
    "id",
    "content",
    "createdAt",
    "updatedAt",
    "author",
    "likedBy",
    "likes",
  ],
  properties: {
    id: {
      type: "string",
      format: "MongoDB id",
      example: "65400f54543880dabb0a6315",
      description: "The MongoDB id of the tweet.",
    },
    author: {
      type: "object",
      $ref: "#/components/schemas/User",
      description: "The information about the author of the tweet",
    },
    likedBy: {
      type: "array",
      items: {
        $ref: "#/components/schemas/User",
      },
      description: "The list of the users who liked this post.",
    },
    likes: {
      type: "number",
      example: 2,
      description: "The number of likes of the tweet.",
    },
    content: {
      type: "string",
      example: "This is tweet content!",
      description: "The content of the tweet.",
    },
    createdAt: {
      type: "string",
      format: "date",
      example: "2023-12-05T09:35:52.282Z",
      description: "The time when the tweet was posted.",
    },
    updatedAt: {
      type: "string",
      format: "date",
      example: "2023-12-05T09:35:52.282Z",
      description: "The time when the tweet was edited.",
    },
  },
};

export const NewTweet = {
  type: "object",
  required: ["content"],
  properties: {
    content: {
      type: "string",
      example: "This is tweet content!",
      description: "The content of the tweet.",
    },
  },
  example: {
    content: "updated content at 1:45",
  },
};
