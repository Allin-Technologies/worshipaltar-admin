"use server";

import { api } from "@/lib/api";
import { verifyLoginSchema, verifyLoginResponseSchema } from "@/schema/auth";
import { z } from "zod";
import { getServerUserAgent } from "@/lib/user-agent";

export async function getOtp(email: string) {
  const userAgent = await getServerUserAgent();

  try {
    const response = await api(z.any(), {
      url: "/auth/request-otp",
      method: "post",
      data: { email },
      headers: {
        "User-Agent": userAgent,
      },
    });

    return {
      status: response.response_code === 201 || response.response_code === 200,
      message: response.message,
    };
  } catch (error) {
    console.error("Error requesting login otp", error);
    return {
      status: false,
      message: "Oops! an error occured while completing your request",
    };
  }
}

export async function login(data: z.infer<typeof verifyLoginSchema>) {
  try {
    const response = await api(verifyLoginResponseSchema, {
      url: "/auth/verify-otp",
      method: "post",
      data,
    });

    return response.data;
  } catch (error) {
    console.error("Error requesting login otp", error);
    return {
      status: false,
      message: "Error",
      data: null,
    };
  }
}
