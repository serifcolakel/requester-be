import { z } from "zod";
import {
  createUserRequest,
  createUserResponse,
  loginRequest,
  loginResponse,
} from "./auth.schema";

export type CreateUserRequest = z.infer<typeof createUserRequest>;
export type CreateUserResponse = z.infer<typeof createUserResponse>;

export type LoginRequest = z.infer<typeof loginRequest>;
export type LoginResponse = z.infer<typeof loginResponse>;
