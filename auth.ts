import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // takes credentials inside the authorize
      async authorize(credentials) {
        // if email or password is  not there
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // we are getting the user details from the database if the email match
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        // if not get it return null
        if (user.length === 0) return null;

        // compare the password to the database's password
        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );

        // if not valid return null
        if (!isPasswordValid) return null;

        // if pass is also valid then return below data
        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",   // where we giving the auth
  },
  callbacks: {
    async jwt({ token, user }) {
        // if  user exits set the token values and return it
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
        // if session exits set the value of session and return it
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
