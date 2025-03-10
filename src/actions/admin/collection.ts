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

  const collectionValidator =
    params.collection === "registration"
      ? Registration
      : params.collection === "volunteer"
      ? Sponsor
      : params.collection === "sponsor"
      ? Volunteer
      : undefined;

  if (!collectionValidator) {
    return {
      data: {
        items: null,
        total: 0,
      },
      status: false,
      message: "Recourse key not specified!",
    };
  }

  try {
    const response = await api(
      z.object({
        items: z.any().array(),
        total: z.number(),
        limit: z.number(),
        skip: z.number(),
      }),
      {
        url: `/admin/collections/${params.collection}`,
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
    console.error(`Error requesting ${params.collection} data`, error);
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
