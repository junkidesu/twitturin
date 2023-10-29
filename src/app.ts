import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";

console.log('connecting to MongoDB');
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log(`connected to MongoDB`))
  .catch(error => console.log(error));

const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

export default app;
