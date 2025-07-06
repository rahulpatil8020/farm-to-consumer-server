import prisma from "../config/db";
import type { Prisma } from "@prisma/client";
import { RegisterUserInput } from "../types/user.types";

export const createUser = async (data: RegisterUserInput) => {
  return await prisma.user.create({ data });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getUserByPhone = async (phone: string) => {
  return await prisma.user.findUnique({ where: { phone } });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
