import { boolean, date, number, object, string, enum as ZodEnum } from "zod";

export const sendLoginSchema = object({
  email: string().email(),
});

export const verifyLoginSchema = object({
  email: string().email(),
  otp: string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const accountSchema = object({
  _id: string(),
  email: string().email(),
  name: string(),
  status: ZodEnum(["active", "frozen"]),
  role: ZodEnum(["admin", "agent"]),
  timestamp: date().or(string()),
});

export const verifyLoginResponseSchema = object({
  account: accountSchema,
  token: string(),
});

export const inviteSchema = object({
  email: string().email(),
  name: string(),
  role: ZodEnum(["admin", "agent"]),
});

export const registerResponseSchema = object({
  account: accountSchema,
});
