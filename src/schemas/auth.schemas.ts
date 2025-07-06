import { z } from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters long")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
  phone: z
    .string()
    .min(7, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^[0-9+\s\-()]+$/, "Phone number must contain only digits and +"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must not exceed 100 characters"),
  role: z.enum(["FARMER", "CUSTOMER"]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const LoginSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^[0-9+\s\-()]+$/, "Phone number must contain only digits and +"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must not exceed 100 characters"),
});
