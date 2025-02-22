import { z } from "zod";

export const AccountStatus = z.enum(["active", "frozen"]);
export type AccountStatus = z.infer<typeof AccountStatus>;
export const AccountRole = z.enum(["admin", "agent"]);
export type AccountRole = z.infer<typeof AccountRole>;

export const Account = z.object({
  _id: z.string().length(24),
  name: z.string(),
  email: z.string().email(),
  status: AccountStatus,
  role: AccountRole,
  timestamp: z.date().or(z.string()),
});
export type Account = z.infer<typeof Account>;
