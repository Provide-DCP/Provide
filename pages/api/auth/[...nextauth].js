import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../src/lib/mongodb.js";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { html, text } from "../../../src/lib/sendVerificationRequest.js";
import axios from "axios";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
        async sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from },
        }) {
          const { host } = new URL(url);
          const transport = nodemailer.createTransport(server);
          await transport.sendMail({
            to: email,
            from,
            subject: `Sign inasdfgadfas to ${host}`,
            text: text({ url, host }),
            html: html({ url, host, email }),
          });
        },
      }),
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
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      session: async ({ session, token }) => {
        const { data } = await axios.get(`http://localhost:3000/api/users`, {
          params: {
            userId: token.sub,
          },
        });
        const { details } = data;
        session.userId = token.sub;
        session.userDetails = details;
        return Promise.resolve(session);
      },
    },
  });
}
