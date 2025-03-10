/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z, ZodError } from "zod";
import { api } from "@/lib/api";
import { verifyLoginResponseSchema, verifyLoginSchema } from "@/schema/auth";
import { getGravatarUrl } from "@/lib/gravatar";

declare module "next-auth" {
  interface AdapterUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    access_token?: string | null;
  }

  interface Session {
    user: AdapterUser;
    expires: Date & string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          // logic to verify if the user exists
          const data = await verifyLoginSchema.parseAsync(credentials);

          const res = await api(verifyLoginResponseSchema, {
            url: "/auth/verify-otp",
            method: "post",
            data,
          });

          if (!res.data?.token) {
            // No user found, so this is their first attempt to login
            throw new Error("AccessDenied");
          }

          if (res.data?.account?.status == "frozen") {
            // No user found, so this is their first attempt to login
            throw new Error("InactiveUser");
          }

          const image = await getGravatarUrl(res.data.account.email);

          // return user object with their profile data
          return {
            ...res.data.account,
            image,
            access_token: res.data.token,
          };
        } catch (e) {
          console.error(e);
          if (e instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    // @ts-ignore
    async authorized({ auth, request: { nextUrl } }) {
      // const isAuthRoute = nextUrl.pathname.includes("/auth");

      // if (nextUrl.pathname === "/") {
      //   return Response.redirect(new URL(`/dashboard`, nextUrl));
      // }

      // if (isAuthRoute && auth) {
      //   // If the path includes "/auth" and the user is authenticated
      //   return Response.redirect(new URL(`/dashboard`, nextUrl));
      // }

      // if (!isAuthRoute && !auth) {
      //   // If the path includes "/auth" and the user is NOT authenticated
      //   return Response.redirect(
      //     new URL(`/auth/sign-in?callbackUrl=${nextUrl.pathname}`, nextUrl)
      //   );
      // }

      // Allow access for all other cases
      return true;
    },
    // @ts-ignore
    jwt(params) {
      // console.log("jwt data:", params);
      if (params.user) {
        return {
          ...params.token,
          user: params.user,
        };
      }

      if (params.trigger === "update" && params.session) {
        // console.log("jwt data:", params);

        params.token = {
          ...params.token,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          user: { ...(params.token as any), ...params.session.user },
        };
        return params.token;
      }

      return params.token;
    },
    // @ts-ignore
    session(params) {
      params.session.user = {
        ...params.session.user,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(params.token.user as unknown as any),
      };

      return params.session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 22 * 60 * 60,
  },
  trustHost: true,
});
