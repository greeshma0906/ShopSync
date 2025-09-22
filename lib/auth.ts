import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
          access_type: "offline", // <<< important: get refresh token
          prompt: "consent", // <<< ensures refresh token is returned on sign-in
        },
      },
    }),
  ],
  callbacks: {
    // jwt runs on sign-in and on every subsequent call server-side
    async jwt({ token, account }) {
      // On initial sign in, store tokens returned from provider
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).error = (token as any).error;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
