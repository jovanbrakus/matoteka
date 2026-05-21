import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    displayName: string;
    role: string;
    targetFaculties: string[];
    onboardedAt: Date | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    displayName: string;
    role: string;
    targetFaculties: string[];
    onboardedAt: Date | null;
  }
}
