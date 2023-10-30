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

  return next(error);
};
