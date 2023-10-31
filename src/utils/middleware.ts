import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError, User, NotFoundError } from "../types";
import { Types } from "mongoose";
import env from "./config";
import UserModel from "../models/user";
import TweetModel from "../models/tweet";

const parseToken = (text: string): string => {
  if (!text || !text.startsWith("Bearer "))
    throw new AuthError("token missing or invalid");

  return text.replace("Bearer ", "");
};

const extractUser = async (tokenData: unknown) => {
  if (!tokenData || typeof tokenData !== "object" || !("id" in tokenData))
    throw new AuthError("token missing or invalid");

  const user = await UserModel.findById(tokenData.id);

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

const checkAuthor = async (
  user: User & { _id: Types.ObjectId },
  id: string
) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const author = tweet.author.toString();
  const userId = user._id.toString();

  if (userId !== author) throw new AuthError("need to be author of tweet");
};

export const requireAuthor = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!("id" in req.params) || !req.user) return next();

  try {
    await checkAuthor(req.user, req.params.id);
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
  if (!req.user || !("id" in req.params)) return next();

  try {
    checkSameUser(req.user, req.params.id);
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

  if (error.name === "ValidationError")
    return res.status(400).json({ error: `ValidationError: ${error.message}` });
  if (error.name === "ParseError")
    return res.status(400).json({ error: `ParseError: ${error.message}` });
  if (error.name === "NotFoundError")
    return res.status(404).json({ error: `NotFoundError: ${error.message}` });
  if (error.name === "AuthError")
    return res.status(401).json({ error: `AuthError: ${error.message}` });
  if (error.name === "JsonWebTokenError")
    return res
      .status(401)
      .json({ error: `JsonWebTokenError: ${error.message}` });

  return next(error);
};
