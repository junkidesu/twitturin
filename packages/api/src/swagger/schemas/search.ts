export const SearchData = {
  type: "object",
  properties: {
    tweets: {
      type: "array",
      description: "The tweets that contain the given keyword",
      items: {
        $ref: "#/components/schemas/Tweet",
      },
    },
    users: {
      type: "array",
      description:
        "The users whose usernames or names contain the given keyword",
      items: {
        $ref: "#/components/schemas/User",
      },
    },
    replies: {
      type: "array",
      description: "The tweets that contain the given keyword",
      items: {
        $ref: "#/components/schemas/Reply",
      },
    },
  },
};
