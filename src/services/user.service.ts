import bcrypt from "bcryptjs";
import * as userModel from "../models/user.model";
import { formatPhoneToE164 } from "../utils/phone.utils";
import { RegisterUserInput } from "../types/user.types";
import { ValidationError, AuthError } from "../utils/errors"; // 👈 Custom errors
import { signAccessToken, signRefreshToken } from "../utils/jwt.utils"; // �� JWT utilities

export const registerUser = async (data: RegisterUserInput) => {
  const formattedPhone = formatPhoneToE164(data.phone, "IN");

  const existingUser = await userModel.getUserByPhone(formattedPhone);
  if (existingUser) {
    // 🪄 Throw structured validation error
    throw new AuthError("Phone number already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await userModel.createUser({
    ...data,
    password: hashedPassword,
    phone: formattedPhone,
  });
};

export const loginUser = async (phone: string, password: string) => {
  const formattedPhone = formatPhoneToE164(phone, "IN");

  const user = await userModel.getUserByPhone(formattedPhone);
  if (!user) throw new AuthError("Invalid phone or password");

  if (!user.password) throw new AuthError("User password is not set");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AuthError("Invalid phone or password");

  const accessToken = signAccessToken({ userId: user.id, role: user.role });
  const refreshToken = signRefreshToken({ userId: user.id, role: user.role });

  return { accessToken, refreshToken, user };
};
