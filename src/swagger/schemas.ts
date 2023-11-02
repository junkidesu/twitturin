export const NewUser = {
  type: "object",
  required: ["username", "password", "studentId", "email", "major"],
  properties: {
    username: {
      type: "string",
      description: "the username of the user",
    },
    password: {
      type: "string",
      format: "password",
      description: "the password of the user",
    },
    fullName: {
      type: "string",
      description: "the full name of the user",
    },
    studentId: {
      type: "string",
      format: "TTPU student ID",
      description: "the student ID given to each student of TTPU",
    },
    email: {
      type: "string",
      format: "email",
      description: "the email of the user",
    },
    major: {
      type: "string",
      format: "TTPU major",
      description: "the major of the user",
    },
    country: {
      type: "string",
      description: "the country of residence of the user",
    },
    age: {
      type: "number",
      description: "the age of the user",
    },
  },
  example: {
    username: "johndoe01",
    studentId: "se12345",
    password: "password123",
    email: "somenonexistingemail@gmail.com",
    fullName: "John Doe",
    major: "SE",
    age: 21,
    country: "Uzbekistan",
  },
};

export const User = {
  type: "object",
  required: [
    "id",
    "username",
    "password",
    "studentId",
    "email",
    "tweets",
    "major",
  ],
  properties: {
    id: {
      type: "string",
      format: "MongoDB identifier",
      description: "the id of the MongoDB document corresponding to the user",
    },
    username: {
      type: "string",
      description: "the username of the user",
    },
    fullName: {
      type: "string",
      description: "the full name of the user",
    },
    studentId: {
      type: "string",
      format: "TTPU student ID",
      description: "the student ID given to each student of TTPU",
    },
    email: {
      type: "string",
      format: "email",
      description: "the email of the user",
    },
    major: {
      type: "string",
      format: "TTPU major",
      description: "the major of the user",
    },
    tweets: {
      type: "array",
      description: "the tweets posted by the user",
      items: {
        $ref: "#/components/schemas/TweetItem",
      },
    },
    country: {
      type: "string",
      description: "the country of residence of the user",
    },
    age: {
      type: "number",
      description: "the age of the user",
    },
  },
  example: {
    id: "653fe7bb0e51f6d650fc109e",
    username: "johndoe01",
    studentId: "se12345",
    email: "somenonexistingemail@gmail.com",
    fullName: "John Doe",
    major: "SE",
    age: 21,
    country: "Uzbekistan",
  },
};

export const EditUser = {
  type: "object",
  properties: {
    username: {
      type: "string",
      description: "the new username of the user",
    },
    email: {
      type: "string",
      format: "email",
      description: "the new email of the user",
    },
    country: {
      type: "string",
      description: "the new country of residence of the user",
    },
  },
};

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
    author: {
      username: "nonexisting",
      major: "SE",
      studentId: "se99999",
      email: "unknown@example.com",
      country: "Uzbekistan",
      id: "653fe7dd0e51f6d650fc10a0",
    },
    createdAt: "2023-10-30T20:17:24.531Z",
    updatedAt: "2023-10-30T20:49:19.585Z",
    id: "65400f54543880dabb0a6315",
  },
};

export const Tweet = {
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
      type: "object",
      additionalProperties: {
        $ref: "#/components/schemas/User",
      },
      description: "The author of the tweet, in JSON format.",
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
    createdAt: "2023-10-30T20:17:24.531Z",
    updatedAt: "2023-10-30T20:49:19.585Z",
    id: "65400f54543880dabb0a6315",
  },
};

export const NewTweet = {
  type: "object",
  required: ["content", "author"],
  properties: {
    content: {
      type: "string",
      description: "The content of the tweet.",
    },
    author: {
      type: "string",
      format: "MongoDB id",
      description: "The MongoDB id of the author.",
    },
  },
  example: {
    content: "updated content at 1:45",
    author: "653fe7dd0e51f6d650fc10a0",
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

export const Error = {
  type: "object",
  properties: {
    error: {
      type: "string",
      description: "the error message",
    },
  },
  example: {
    error: "error message",
  },
};
