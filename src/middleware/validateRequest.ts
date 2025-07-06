import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../utils/errors";

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.flatten().fieldErrors);
    }

    req.body = result.data;
    next();
  };
};
