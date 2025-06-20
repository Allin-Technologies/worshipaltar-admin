import { z } from "zod";

export const defaultSchema = z.object({
  _id: z.string().length(24),
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  gender: z.enum(["male", "female", "other"]),
  timestamp: z.date().or(z.string()),
});

export const Registration = defaultSchema.extend({});
export type Registration = z.infer<typeof Registration>;

export const NewConvert = defaultSchema.extend({
  metadata: z.object({
    socials: z
      .object({
        platform: z.string(),
        handle: z.string(),
      })
      .array(),
    address: z.object({
      line_1: z.string().min(2, { message: "Required" }),
    }),
  }),
});
export type NewConvert = z.infer<typeof NewConvert>;

export const Testimony = defaultSchema.extend({
  metadata: z.object({
    socials: z
      .object({
        platform: z.string(),
        handle: z.string(),
      })
      .array(),
    title: z.string().min(2, { message: "Required" }),
    body: z.string().min(2, { message: "Required" }),
    attachments: z.any().array(),
  }),
});
export type Testimony = z.infer<typeof Testimony>;
