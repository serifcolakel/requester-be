import { z } from "zod";
import {
  createUserRequest,
  createUserResponse,
  loginRequest,
  loginResponse,
  userListResponse,
} from "./user.schema";

export type CreateUserRequest = z.infer<typeof createUserRequest>;
export type CreateUserResponse = z.infer<typeof createUserResponse>;

export type LoginRequest = z.infer<typeof loginRequest>;
export type LoginResponse = z.infer<typeof loginResponse>;

export type UserListResponse = z.infer<typeof userListResponse>;
