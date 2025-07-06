import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./src/lib/db";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: email }
        });

        if (!user) {
          return null;
        }

        const matches = compareSync(password, user.password ?? "");

        if (matches) {
          const userRes = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
          console.log("userRes", userRes);
          return userRes;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
});
