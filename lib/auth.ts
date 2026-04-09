import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const passwordEnabled = process.env.AUTH_PASSWORD_ENABLED !== "false";

// In-memory rate limiter for credential auth (per email)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(email);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(email, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= MAX_ATTEMPTS;
}

function clearRateLimit(email: string): void {
  loginAttempts.delete(email);
}

const providers = [
  ...(passwordEnabled
    ? [Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Lozinka", type: "password" },
        },
        async authorize(credentials) {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) return null;

          if (!checkRateLimit(email)) return null;

          const result = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          const user = result[0];
          if (!user || !user.passwordHash) return null;

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) return null;

          clearRateLimit(email);

          return {
            id: user.id,
            email: user.email,
            name: user.displayName,
            image: user.avatarUrl,
            displayName: user.displayName,
            role: user.role,
            targetFaculties: (user.targetFaculties as string[]) || [],
            needsOnboarding: user.displayName === user.email?.split("@")[0],
          };
        },
      })]
    : []),
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

      const existingByGoogleId = await db
        .select()
        .from(users)
        .where(eq(users.googleId, account.providerAccountId))
        .limit(1);

      if (existingByGoogleId.length === 0) {
        // Check if a user with this email already exists (e.g. created via password)
        const existingByEmail = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existingByEmail.length > 0) {
          // Link Google account to existing user
          await db
            .update(users)
            .set({
              googleId: account.providerAccountId,
              avatarUrl: existingByEmail[0].avatarUrl || user.image,
              updatedAt: new Date(),
            })
            .where(eq(users.id, existingByEmail[0].id));
        } else {
          await db.insert(users).values({
            googleId: account.providerAccountId,
            email: user.email,
            displayName: user.name || user.email.split("@")[0],
            avatarUrl: user.image,
            role: "student",
          });
        }
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
        session.user.id = token.userId as string;
        session.user.displayName = token.displayName as string;
        session.user.role = token.role as string;
        session.user.targetFaculties = token.targetFaculties as string[];
        session.user.needsOnboarding = token.needsOnboarding as boolean;
      }
      return session;
    },
  },
});
