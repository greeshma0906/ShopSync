// import type { DefaultSession } from "next-auth"

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string
//     user: {
//       id: string
//     } & DefaultSession["user"]
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string
//     refreshToken?: string
//   }
// }

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string; // <-- add this so TypeScript knows about possible error
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number; // <-- add this
    refreshToken?: string;
    error?: string; // <-- add this too
  }
}
