"use server";

import { api } from "@/lib/api";
import { auth } from "../../../auth";

import { Registration, Sponsor, Volunteer } from "@/schema/entities";
import { PaginationState } from "@/schema/pagination";
import { z } from "zod";

interface Params {
  collection: "registration" | "sponsor" | "volunteer";
  pagination: PaginationState;
}

export interface BaseResponse<T> {
  data: T;
  message: string;
  status: boolean;
}

export async function getCollectionList(params: Params): Promise<{
  data: {
    items: Array<Registration | Sponsor | Volunteer> | null;
    total: number;
  };
  status: boolean;
  message: string;
}> {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") {
    return {
      data: {
        items: null,
        total: 0,
      },
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(
      z.object({
        items: z.object({ _id: z.string() }).array(),
        total: z.number(),
      }),
      {
        url: `/admin/${params.collection}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      }
    );

    return {
      data: response?.data as any,
      status: response?.response_code == 200,
      message:
        response?.response_code == 200
          ? `${params.collection} data retrieved sucessfully`
          : response?.message ?? "Something went wrong",
    };
  } catch (error) {
    console.error("Error requesting registration data", error);
    return {
      data: {
        items: null,
        total: 0,
      },
      status: false,
      message: "An unexpected error occured!",
    };
  }
}
