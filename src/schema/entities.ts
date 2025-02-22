import { z } from "zod";

export const defaultSchema = z.object({
  _id: z.string().length(24),
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  gender: z.enum(["male", "female", "other"]),
  timestamp: z.date().or(z.string()),
});

export const Registration = defaultSchema.extend({
  checked_in: z.boolean().optional(),
  metadata: z.object({
    financial_goals: z.string(),
  }),
});
export type Registration = z.infer<typeof Registration>;

export const Sponsor = defaultSchema.extend({
  metadata: z.object({
    contactPerson: z.string(),
    website: z.string(),
    location: z.string(),
    sponsorhip: z.object({
      category: z.enum(["Platinum", "Gold", "Silver", "Bronze", "Custom"]),
      custom: z.string().nullable().optional(),
      type: z.enum(["Financial", "Product", "Service", "Venue", "Other"]),
      other: z.string().nullable().optional(),
      motivation: z.string(),
      requests: z.string(),
      future: z.boolean(),
    }),
    brandingBooth: z.boolean(),
    brandingBoothAssets: z.boolean(),
  }),
});
export type Sponsor = z.infer<typeof Sponsor>;

export const Volunteer = defaultSchema.extend({
  metadata: z.object({
    shirt_size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
    skills: z.string(),
    motivation: z.string(),
    availability: z.boolean(),
    teams: z.object({
      value: z.array(z.string()),
      other: z.string().nullable().optional(),
    }),
    expectations: z.string(),
    futureInterest: z.boolean(),
  }),
});
export type Volunteer = z.infer<typeof Volunteer>;
