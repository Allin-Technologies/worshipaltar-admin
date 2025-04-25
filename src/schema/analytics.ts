import { z } from "zod";

export const AnalyticsData = z.record(
  z.string(),
  z.object({
    registrations: z.number(),
    testimonies: z.number(),
    new_convert: z.number(),
  })
);

export type AnalyticsData = z.infer<typeof AnalyticsData>;
