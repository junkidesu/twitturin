export const BaseTweet = {
  type: "object",
  required: ["id", "content", "createdAt", "updatedAt"],
  properties: {
    id: {
      type: "string",
      format: "MongoDB id",
      description: "The MongoDB id of the tweet.",
    },
    content: {
      type: "string",
      description: "The content of the tweet.",
    },
    createdAt: {
      type: "string",
      format: "date",
      description: "The time when the tweet was posted.",
    },
    updatedAt: {
      type: "string",
      format: "date",
      description: "The time when the tweet was edited.",
    },
  },
};

export const UserTweet = {
  type: "object",
  required: ["author"],
  allOf: [
    {
      $ref: "#/components/schemas/BaseTweet",
    },
    {
      type: "object",
    },
  ],
  properties: {
    author: {
      type: "string",
      description: "The MongoDB id of the author of the tweet.",
    },
  },
  example: {
    content: "updated content at 1:45",
    author: "653fe7dd0e51f6d650fc10a0",
    createdAt: "2023-10-30T20:17:24.531Z",
    updatedAt: "2023-10-30T20:49:19.585Z",
    id: "65400f54543880dabb0a6315",
  },
};

export const Tweet = {
  type: "object",
  required: ["author", "likedBy", "likes"],
  allOf: [
    {
      $ref: "#/components/schemas/BaseTweet",
    },
    {
      type: "object",
    },
  ],
  properties: {
    author: {
      type: "object",
      additionalProperties: {
        $ref: "#/components/schemas/User",
      },
      description: "The author of the tweet, in JSON format.",
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
      description: "The number of likes of the tweet.",
    },
  },
  example: {
    content: "updated content at 1:45",
    author: {
      username: "nonexisting",
      major: "SE",
      studentId: "se99999",
      email: "unknown@example.com",
      country: "Uzbekistan",
      id: "653fe7dd0e51f6d650fc10a0",
    },
    likedBy: [],
    likes: 0,
    createdAt: "2023-10-30T20:17:24.531Z",
    updatedAt: "2023-10-30T20:49:19.585Z",
    id: "65400f54543880dabb0a6315",
  },
};

export const NewTweet = {
  type: "object",
  required: ["content"],
  properties: {
    content: {
      type: "string",
      description: "The content of the tweet.",
    },
  },
  example: {
    content: "updated content at 1:45",
  },
};

export const EditTweet = {
  type: "object",
  required: ["content"],
  properties: {
    content: {
      type: "string",
      description: "The new content of the tweet.",
    },
  },
};
