import { z } from "zod";

export const AnalyticsData = z.record(
  z.string(),
  z.object({
    registrations: z.number(),
    sponsors: z.number(),
    volunteers: z.number(),
  })
);

export type AnalyticsData = z.infer<typeof AnalyticsData>;
