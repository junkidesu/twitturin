export const BaseUser = {
  type: "object",
  required: ["username", "studentId", "email", "major"],
  properties: {
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
    country: {
      type: "string",
      description: "the country of residence of the user",
    },
    age: {
      type: "number",
      description: "the age of the user",
    },
  },
};

export const NewUser = {
  type: "object",
  required: ["password"],
  allOf: [
    {
      $ref: "#/components/schemas/BaseUser",
    },
    {
      type: "object",
    },
  ],
  properties: {
    password: {
      type: "string",
      format: "password",
      description: "the password of the user",
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
  required: ["id", "tweets"],
  allOf: [
    {
      $ref: "#/components/schemas/BaseUser",
    },
    {
      type: "object",
    },
  ],
  properties: {
    id: {
      type: "string",
      format: "MongoDB identifier",
      description: "the id of the MongoDB document corresponding to the user",
    },
    tweets: {
      type: "array",
      description: "the tweets posted by the user",
      items: {
        $ref: "#/components/schemas/UserTweet",
      },
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
    tweets: [],
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

export const TweetAuthor = {
  type: "object",
  allOf: [
    {
      $ref: "#/components/schemas/BaseUser",
    },
    {
      type: "object",
    },
  ],
  properties: {
    id: {
      type: "string",
      format: "MongoDB id",
      description: "the MongoDB id of the author of the tweet",
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
