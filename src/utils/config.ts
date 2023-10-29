import fs from "fs";
import path from "path";
import dotenv from "dotenv";

if (fs.existsSync(`${path.dirname(__filename)}/../../.env`)) dotenv.config();

const PORT = process.env.PORT;

let MONGODB_URI: string | undefined;

switch (process.env.NODE_ENV) {
  case "test":
    MONGODB_URI = process.env.TEST_MONGODB_URI;
    break;
  case "production":
    MONGODB_URI = process.env.MONGODB_URI;
    break;
  default:
    MONGODB_URI = process.env.DEV_MONGODB_URI;
}

if (!PORT || !MONGODB_URI) throw new Error("Missing environmental variables");

const env = { PORT: Number(PORT), MONGODB_URI };

export default env;
