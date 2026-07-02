export type UserRole = "user" | "admin";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};