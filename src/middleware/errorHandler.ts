import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // console.error("API Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        type: err.type,
        message: err.message,
        details: err.details || null,
      },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        type: "ValidationError",
        message: "Input validation failed",
        details: err.flatten().fieldErrors,
      },
    });
  }

  // if (process.env.NODE_ENV !== "production") {
  //   console.error(err.stack);
  // }

  return res.status(500).json({
    success: false,
    error: {
      type: "InternalServerError",
      message: "An unexpected error occurred",
      details: null,
    },
  });
};
