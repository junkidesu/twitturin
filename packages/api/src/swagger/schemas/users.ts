export const UserCommon = {
  type: "object",
  required: ["username", "studentId", "email", "major", "birthday"],
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
      example: "johndoe@example.com",
      description: "the email of the user",
    },
    country: {
      type: "string",
      example: "USA",
      description: "the country of residence of the user",
    },
    birthday: {
      type: "string",
      format: "YYYY-mm-dd",
      example: "2001-09-30",
      description: "The birthday of the user",
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
    birthday: "2001-09-30",
    country: "Uzbekistan",
    kind: "student",
  },
};

export const User = {
  type: "object",
  required: ["id", "followingCount", "followersCount", "age"],
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
      example: "65400f54543880dabb0a6315",
      description: "the id of the MongoDB document corresponding to the user",
    },
    followingCount: {
      type: "number",
      example: 1,
      description: "the number of users that the user is following",
    },
    followersCount: {
      type: "number",
      example: 1,
      description: "the number of followers of the user",
    },
    age: {
      type: "number",
      example: 21,
      description: "the age of the user",
    },
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
