export const UserCommon = {
  type: "object",
  required: ["username", "studentId", "email", "major"],
  properties: {
    username: {
      type: "string",
      example: "student1",
      description: "the username of the user",
    },
    fullName: {
      type: "string",
      example: "John Doe",
      description: "the full name of the user",
    },
    email: {
      type: "string",
      format: "email",
      example: "student1@example.com",
      description: "the email of the user",
    },
    country: {
      type: "string",
      example: "Uzbekistan",
      description: "the country of residence of the user",
    },
    age: {
      type: "number",
      example: 21,
      description: "the age of the user",
    },
  },
};

export const StudentUser = {
  type: "object",
  required: ["studentId", "major", "kind"],
  allOf: [
    {
      $ref: "#/components/schemas/UserCommon",
    },
  ],
  properties: {
    studentId: {
      type: "string",
      description: "the TTPU student ID of the student",
    },
    major: {
      type: "string",
      format: "TTPU major",
      description: "the major of the user",
      enum: ["SE", "AD", "BM", "ME", "IT", "CIE", "AE"],
    },
    kind: {
      type: "string",
      description: "the type of the user",
      enum: ["student"],
    },
  },
};

export const TeacherUser = {
  type: "object",
  required: ["subject", "kind"],
  allOf: [
    {
      $ref: "#/components/schemas/UserCommon",
    },
  ],
  properties: {
    subject: {
      type: "string",
      description: "The subject that the teacher teaches at TTPU",
    },
    kind: {
      type: "string",
      description: "the type of the user",
      enum: ["teacher"],
    },
  },
};

export const NewUser = {
  type: "object",
  required: ["password"],
  oneOf: [
    {
      $ref: "#/components/schemas/StudentUser",
    },
    {
      $ref: "#/components/schemas/TeacherUser",
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
    username: "student1",
    studentId: "se12345",
    password: "password123",
    email: "example@example.com",
    fullName: "John Doe",
    major: "SE",
    age: 21,
    country: "Uzbekistan",
    kind: "student",
  },
};

export const User = {
  type: "object",
  required: ["id"],
  oneOf: [
    {
      $ref: "#/components/schemas/StudentUser",
    },
    {
      $ref: "#/components/schemas/TeacherUser",
    },
  ],
  discriminator: {
    propertyName: "kind",
  },
  properties: {
    id: {
      type: "string",
      format: "MongoDB identifier",
      description: "the id of the MongoDB document corresponding to the user",
    },
  },
};

export const PopulatedUser = {
  type: "object",
  required: ["tweets", "replies"],
  allOf: [
    {
      $ref: "#/components/schemas/User",
    },
  ],
  properties: {
    tweets: {
      type: "array",
      description: "the tweets posted by the user",
      items: {
        $ref: "#/components/schemas/Tweet",
      },
    },
    replies: {
      type: "array",
      items: {
        type: "string"
      }
    }
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
