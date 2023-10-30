import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError } from "../types";
import env from "./config";
import User from "../models/user";

const parseToken = (text: string): string => {
  if (!text || !text.startsWith("Bearer "))
    throw new AuthError("token missing or invalid");

  return text.replace("Bearer ", "");
};

const extractUser = async (tokenData: unknown) => {
  if (!tokenData || typeof tokenData !== "object" || !("id" in tokenData))
    throw new AuthError("token missing or invalid");

  const user = await User.findById(tokenData.id);

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
    console.log(req.user);
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
