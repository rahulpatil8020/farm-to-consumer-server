export const ROLES = {
  FARMER: "FARMER",
  CUSTOMER: "CUSTOMER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const OTP_EXPIRY_MINUTES = 5;

export const JWT_EXPIRY = "7d";

export const APP = {
  NAME: "Farm-to-Consumer",
  VERSION: "1.0.0",
};

export const API_ROUTES = {
  AUTH: "/api/auth",
  USERS: "/api/users",
};
