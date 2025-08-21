import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      registered: boolean;
      id: string;
      role: string;
      name: string;
      email: string;
      coverImage?: string;
    };
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name?: string;
    coverImage?: string;
  }

  interface Account {
    provider: string;
    type: string;
    providerAccountId: string;
    userId: string;
    accessToken?: string;
    refreshToken?: string;
    expires_at?: number;
  }

  interface JWT {
    id?: string;
    role?: string;
    name?: string;
    email?: string;
    coverImage?: string;
  }
}
