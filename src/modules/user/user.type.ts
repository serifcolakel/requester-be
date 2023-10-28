import { z } from "zod";
import { userListResponse } from "./user.schema";

export type UserListResponse = z.infer<typeof userListResponse>;
