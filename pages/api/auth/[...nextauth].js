import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    pages: {
      signIn: "/auth/signin",
      error: "/auth/signin",
      verifyRequest: "/auth/verify",
    },
    callbacks: {
      session: async ({ session, token }) => {
        const {
          data: { details },
        } = await axios.get(`${process.env.HOST_URL}/api/users/?userId=${token.sub}`);
        session.userId = token.sub;
        session.userDetails = details;
        return session;
      },
    },
  });
}
