import { Request, Response, NextFunction } from "express";

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

  return next(error);
};
