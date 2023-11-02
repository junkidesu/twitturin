export const AuthData = {
  type: "object",
  required: ["studentId", "password"],
  properties: {
    studentId: {
      type: "string",
      format: "TTPU student id",
      description: "student ID given to each student at TTPU",
    },
    password: {
      type: "string",
      format: "password",
      description: "the password of the user",
    },
  },
  example: {
    studentId: "se12345",
    password: "password123",
  },
};

export const TokenData = {
  type: "object",
  required: ["id", "token", "studentId", "username"],
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
    studentId: {
      type: "string",
      format: "TTPU student id",
      description: "the student id of the user",
    },
    username: {
      type: "string",
      description: "the username of the user",
    },
  },
  example: {
    id: "653fe7bb0e51f6d650fc109e",
    token: "<JWT token>",
    studentId: "se12345",
    username: "johndoe01",
  },
};
