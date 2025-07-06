import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as any;

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as any;
