import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError, User, NotFoundError } from "../types";
import { Types } from "mongoose";
import env from "./config";
import UserModel from "../models/user";
import TweetModel from "../models/tweet";
import ReplyModel from "../models/reply";
import logger from "./logger";

const parseToken = (text: string): string => {
  if (!text || !text.startsWith("Bearer "))
    throw new AuthError("token missing or invalid");

  return text.replace("Bearer ", "");
};

const extractUser = async (tokenData: unknown) => {
  if (!tokenData || typeof tokenData !== "object" || !("id" in tokenData))
    throw new AuthError("token missing or invalid");

  const user = await UserModel.findById<User & { _id: Types.ObjectId }>(
    tokenData.id
  );

  if (!user) throw new NotFoundError("user not found");

  return user;
};

export const userExtractor = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) return next();

  try {
    const token = parseToken(req.headers["authorization"]);
    const decodedToken = jwt.verify(token, env.SECRET);
    const user = await extractUser(decodedToken);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => (req.user ? next() : next(new AuthError("authentication required")));

export const requireTweetAuthor = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!("id" in req.params) || !req.user) return next();

  const tweet = await TweetModel.findById<{
    author: User & { _id: Types.ObjectId };
  }>(req.params.id);

  if (!tweet) return next(new NotFoundError("tweet not found"));

  const author = tweet.author._id.toString();
  const userId = req.user._id.toString();

  if (userId !== author)
    return next(new AuthError("need to be author of tweet"));

  return next();
};

export const requireReplyAuthor = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!("id" in req.params) || !req.user) return next();

  const reply = await ReplyModel.findById<{
    author: User & { _id: Types.ObjectId };
  }>(req.params.id);

  if (!reply) return next(new NotFoundError("reply not found"));

  const author = reply.author._id.toString();
  const userId = req.user._id.toString();

  if (userId !== author)
    return next(new AuthError("need to be author of reply"));

  return next();
};

export const requireSameUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user || !("id" in req.params)) return next();

  if (req.user._id.toString() !== req.params.id)
    return next(new AuthError("action can only be done by same user"));

  return next();
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.log(`${error.name}: ${error.message}`);

  if (error.name === "CastError")
    return res.status(400).json({ error: "invalid MongoDB id" });
  if (error.name === "ValidationError")
    return res.status(400).json({ error: error.message });
  if (error.name === "ParseError")
    return res.status(400).json({ error: error.message });
  if (error.name === "NotFoundError")
    return res.status(404).json({ error: error.message });
  if (error.name === "AuthError")
    return res.status(401).json({ error: error.message });
  if (error.name === "JsonWebTokenError")
    return res.status(401).json({ error: error.message });

  return next(error);
};
