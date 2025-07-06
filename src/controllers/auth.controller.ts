import { Request, Response } from "express";
import * as authService from "../services/user.service";
import { AuthError } from "../utils/errors";
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
} from "../utils/jwt.utils";

export const signup = async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: { user },
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await authService.loginUser(
      req.body.phone,
      req.body.password
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { accessToken, user },
    });
  } catch (err) {
    throw new AuthError("Invalid phone or password");
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AuthError("Refresh token is required");
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });
    res.status(200).json({
      success: true,
      message: "User token refreshed successfully",
      data: { newAccessToken },
    });
  } catch (err) {
    throw new AuthError("Invalid refresh token");
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // Set cookie to expire immediately
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
