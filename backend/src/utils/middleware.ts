import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError, User, NotFoundError } from "../types";
import { Types } from "mongoose";
import env from "./config";
import UserModel from "../models/user";
import TweetModel from "../models/tweet";
import ReplyModel from "../models/reply";

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

  if (!user) return undefined;

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

const checkAuthentication = (req: Request) => {
  if (!req.user) throw new AuthError("authentication required");
};

export const requireAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    checkAuthentication(req);

    next();
  } catch (error) {
    next(error);
  }
};

const checkTweetAuthor = async (
  user: User & { _id: Types.ObjectId },
  id: string
) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const author = tweet.author.toString();
  const userId = user._id.toString();

  if (userId !== author) throw new AuthError("need to be author of tweet");
};

export const requireTweetAuthor = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!("id" in req.params) || !req.user) return next();

  try {
    await checkTweetAuthor(req.user, req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

const checkReplyAuthor = async (
  user: User & { _id: Types.ObjectId },
  id: string
) => {
  const reply = await ReplyModel.findById(id);

  if (!reply) throw new NotFoundError("reply not found");

  const author = reply.author.toString();
  const userId = user._id.toString();

  if (userId !== author) throw new AuthError("need to be author of reply");
};

export const requireReplyAuthor = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!("id" in req.params) || !req.user) return next();

  try {
    await checkReplyAuthor(req.user, req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

const checkSameUser = (user: User & { _id: Types.ObjectId }, id: string) => {
  if (user._id.toString() !== id)
    throw new AuthError("action can only be done by same user");
};

export const requireSameUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user || (!("id" in req.params) && !("userId" in req.params)))
    return next();

  try {
    if ("userId" in req.params) {
      checkSameUser(req.user, req.params.userId);
    } else {
      checkSameUser(req.user, req.params.id);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.message);

  if (error.name === "CastError")
    return res.status(400).json({ error: `invalid MongoDB id` });
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
