export interface User {
  id: number;
  name: string;
  email?: string;
  password: string;
  phone: string;
  role: "FARMER" | "CUSTOMER";
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  country?: string;
  createdAt: Date;
}

export type RegisterUserInput = {
  name: string;
  email?: string;
  password: string;
  phone: string;
  role: "FARMER" | "CUSTOMER";
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  country?: string;
};
