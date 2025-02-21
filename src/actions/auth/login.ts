"use server";

import {
  isRedirectError,
  RedirectType,
} from "next/dist/client/components/redirect-error";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { verifyLoginSchema } from "@/schema/auth";
// import { z } from "zod";
// import { verifyLoginSchema as formSchema } from "@/lib/zod";

export type FormState =
  | {
      errors?: {
        otp?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export async function client_login(state: FormState, formData: FormData) {
  let errored = false;
  // Validate form fields
  const validatedFields = verifyLoginSchema.safeParse({
    email: formData.get("email"),
    otp: formData.get("otp"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", validatedFields.data);
  } catch (e) {
    errored = true;

    if (e instanceof AuthError) {
      switch (e.type) {
        case "AccessDenied":
          return {
            message: "User not found.",
          };
        case "CredentialsSignin":
          return {
            message: "Invalid credentials.",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }

    if (isRedirectError(e)) {
      throw e;
    }

    return {
      message: "An unexpected error occurred.",
    };
  } finally {
    if (!errored) {
      // redirect to users actor here

      redirect("/", RedirectType.replace);
    }
  }
}
