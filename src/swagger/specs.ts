import swaggerJsdoc from "swagger-jsdoc";
import {
  NewUser,
  User,
  EditUser,
  AuthData,
  TokenData,
  Tweet,
  Error,
} from "./schemas";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TwitturIn API Documentation with Swagger",
      version: "0.1.0",
      description:
        "TwitturIn is a social media platform for the students of Turin Polytecnic University in Tashkent.",
      license: {
        name: "ISC",
        url: "https://spdx.org/licenses/ISC.html",
      },
      contact: {
        name: "Anvar Sheryatullayev",
        url: "https://github.com/luminous-or-me",
        email: "alvaro.sh03@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "development server",
      },
      {
        url: "https://twitturin.onrender.com/api",
        description: "production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        NewUser,
        User,
        EditUser,
        AuthData,
        Tweet,
        TokenData,
      },
      responses: {
        Error,
      },
    },
    tags: [
      {
        name: "auth",
        description: "the API endpoint for authentication",
      },
      {
        name: "users",
        description: "the API endpoints for user management",
      },
      {
        name: "tweets",
        description: "the API endpoints for managing tweets",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
