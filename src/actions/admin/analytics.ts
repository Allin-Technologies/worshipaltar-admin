"use server";

import { api } from "@/lib/api";
import { auth } from "../../../auth";
import { env } from "../../../env";
import { AnalyticsData } from "@/schema/analytics";

interface Props {
  timeline: "days" | "month" | "year";
  year?: number;
  month?: number;
}

export async function getAnalyticsData({
  timeline = "days",
  year = 2025,
  month,
}: Props) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(AnalyticsData, {
      url: `/admin/analytics/${timeline}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      params: {
        year,
        month,
      },
    });

    return response;
  } catch (error) {
    console.error(`Error requesting analytics data for ${timeline}`, error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}
