"use server";

import { api } from "@/lib/api";
import { auth } from "../../../auth";
import { env } from "../../../env";
import { Account } from "@/schema/account";

export async function getAccounts() {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(Account.array(), {
      url: `/admin/account`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(`Error requesting for user accounts`, error);
    return {
      data: null,
      status: false,
      message: "An unexpected error occured!",
    };
  }
}

export async function inviteAccount(
  account: Pick<Account, "name" | "email" | "role">
) {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") {
    return {
      data: null,
      status: false,
      message: "Unauthorized access to specified resource!",
    };
  }

  try {
    const response = await api(Account.nullable(), {
      url: `/admin/account/invite`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      data: account,
    });

    // console.log(response);

    return response;
  } catch (error: any) {
    console.error(`Error requesting for user accounts`, error);
    return {
      data: null,
      status: false,
      message: error?.message ?? "An unexpected error occured!",
    };
  }
}
