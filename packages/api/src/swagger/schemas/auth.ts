export const AuthData = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: {
      type: "string",
      description: "The username of the user",
    },
    password: {
      type: "string",
      format: "password",
      description: "the password of the user",
    },
  },
  example: {
    username: "johndoe90",
    password: "password123",
  },
};

export const TokenData = {
  type: "object",
  required: ["id", "token", "username"],
  properties: {
    id: {
      type: "string",
      format: "MongoDB identifier",
      description: "the MongoDB id associated with the authenticated user",
    },
    token: {
      type: "string",
      format: "JWT",
      description: "returned JWT token",
    },
    username: {
      type: "string",
      description: "the username of the user",
    },
  },
  example: {
    id: "653fe7bb0e51f6d650fc109e",
    token: "<JWT token>",
    username: "johndoe90",
  },
};
