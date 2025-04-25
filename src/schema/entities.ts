import { z } from "zod";

export const defaultSchema = z.object({
  _id: z.string().length(24),
  name: z.string(),
  tel: z.string(),
  gender: z.enum(["male", "female", "other"]),
  timestamp: z.date().or(z.string()),
});

export const Registration = defaultSchema.extend({
  checked_in: z.boolean().optional(),
});
export type Registration = z.infer<typeof Registration>;

export const NewConvert = defaultSchema.extend({
  email: z.string().email(),
  metadata: z.object({
    dob: z.string(),
    address: z.object({
      country: z.string(),
      state: z.string(),
      line_1: z.string(),
    }),
    service_attended: z.string(),
    worshipping_at: z.string(),
  }),
});
export type NewConvert = z.infer<typeof NewConvert>;

export const Testimony = defaultSchema.extend({
  email: z.string().email(),
  metadata: z.object({
    title: z.string(),
    body: z.string(),
    attachments: z
      .object({
        filename: z.string(),
        url: z.string().url(),
      })
      .array(),
  }),
});
export type Testimony = z.infer<typeof Testimony>;
