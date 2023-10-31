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
  required: ["id", "username", "password", "studentId", "email", "major"],
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
