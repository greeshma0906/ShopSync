// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { google } from "googleapis";

/**
 * Refresh Google access token using the refresh token
 */
async function refreshAccessToken(token: any) {
  try {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    client.setCredentials({ refresh_token: token.refreshToken });

    // refreshAccessToken returns new credentials
    const { credentials } = await client.refreshAccessToken();

    return {
      ...token,
      accessToken: credentials.access_token,
      // credentials.expires_in is in seconds
      accessTokenExpires: Date.now() + ((credentials as any).expires_in ?? 3600) * 1000,
      refreshToken: credentials.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (Number(account.expires_in) ?? 3600) * 1000,
          refreshToken: account.refresh_token,
          user: token.user,
        };
      }

      // If access token hasn't expired yet, return it
      if (Date.now() < (token as any).accessTokenExpires) {
        return token;
      }

      // Access token expired -> refresh it
      return await refreshAccessToken(token);
    },

    // session is what getServerSession returns. Attach accessToken to session.
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
