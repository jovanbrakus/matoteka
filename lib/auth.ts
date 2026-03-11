import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const providers = [
  Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Lozinka", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        const user = result[0];
        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.displayName,
          image: user.avatarUrl,
        };
      },
  }),
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })]
    : []),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/prijava",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (!account || !user.email) return false;

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.googleId, account.providerAccountId))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(users).values({
          googleId: account.providerAccountId,
          email: user.email,
          displayName: user.name || user.email.split("@")[0],
          avatarUrl: user.image,
          role: "student",
        });
      }

      return true;
    },
    async jwt({ token, user, account, trigger }) {
      if (account?.provider === "credentials" && user) {
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id as string))
          .limit(1);

        if (dbUser[0]) {
          token.userId = dbUser[0].id;
          token.displayName = dbUser[0].displayName;
          token.role = dbUser[0].role;
          token.targetFaculties = dbUser[0].targetFaculties;
          token.needsOnboarding =
            dbUser[0].displayName === dbUser[0].email?.split("@")[0];
        }
      } else if (account?.provider === "google") {
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.googleId, account.providerAccountId))
          .limit(1);

        if (dbUser[0]) {
          token.userId = dbUser[0].id;
          token.displayName = dbUser[0].displayName;
          token.role = dbUser[0].role;
          token.targetFaculties = dbUser[0].targetFaculties;
          token.needsOnboarding =
            dbUser[0].displayName === dbUser[0].email?.split("@")[0];
        }
      } else if (trigger === "update" && token.userId) {
        // Re-read from DB when session.update() is called
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.id, token.userId as string))
          .limit(1);

        if (dbUser[0]) {
          token.displayName = dbUser[0].displayName;
          token.role = dbUser[0].role;
          token.targetFaculties = dbUser[0].targetFaculties;
          token.needsOnboarding =
            dbUser[0].displayName === dbUser[0].email?.split("@")[0];
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId as string;
        (session.user as any).displayName = token.displayName as string;
        (session.user as any).role = token.role as string;
        (session.user as any).targetFaculties = token.targetFaculties as string[];
        (session.user as any).needsOnboarding = token.needsOnboarding as boolean;
      }
      return session;
    },
  },
});
