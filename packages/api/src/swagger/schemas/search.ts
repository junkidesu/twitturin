export const SearchData = {
  type: "object",
  properties: {
    users: {
      type: "array",
      description:
        "The users whose usernames or names contain the given keyword",
      items: {
        $ref: "#/components/schemas/User",
      },
    },
  },
};
