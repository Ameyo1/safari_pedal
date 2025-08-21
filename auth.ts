import NextAuth, { type AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rateLimiter";
import { extractProviderId } from "@/lib/utils";

// Log login attempts
export async function logLoginAttempt({
  userId,
  email,
  ip,
  provider,
  success,
  reason,
}: {
  userId?: string;
  email?: string;
  ip?: string;
  provider: string;
  success: boolean;
  reason?: string;
}) {
  try {
    await prisma.loginEvent.create({
      data: { userId, email, ip, provider, success, reason },
    });
  } catch (err) {
    console.error("🚨 LoginEvent logging failed:", err, { email, provider });
  }
}

// Ensure unique usernames for OAuth
async function generateUniqueUsername(base: string): Promise<string> {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  let seed = clean(base);
  let name = seed;
  let count = 1;
  while (await prisma.user.findFirst({ where: { name } })) {
    name = clean(`${seed}_${count++}`);
  }
  return name;
}

// Main NextAuth config
export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
   CredentialsProvider({
  name: "Email & Password",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      if (!credentials?.email || !credentials?.password) {
        console.error("❌ Missing credentials", credentials);
        throw new Error("Please provide both email and password");
      }

      const email = credentials.email.trim().toLowerCase();
      const password = credentials.password;

      if (await isRateLimited(email)) {
        console.warn("🚨 Rate limit exceeded for", email);
        await logLoginAttempt({
          email,
          provider: "credentials",
          success: false,
          reason: "Rate limit exceeded",
        });
        throw new Error("Too many login attempts. Please try again later.");
      }

      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, role: true, coverImage: true, passwordHash: true },
      });

      if (!dbUser?.passwordHash) {
        console.warn("❌ User not found or missing password hash", { email });
        throw new Error("User not found. Please sign up first.");
      }

      const isValid = await compare(password, dbUser.passwordHash);
      if (!isValid) {
        console.warn("❌ Invalid password for", { email, userId: dbUser.id });
        throw new Error("Invalid email or password");
      }

      console.info("✅ Successful credentials login", { email, userId: dbUser.id });

      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name ?? "",
        role: dbUser.role ?? "",
        coverImage: dbUser.coverImage ?? "",
      };
    } catch (err) {
      console.error("❌ Credentials authorize error", err);
      throw err;
    }
  },
})

  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  callbacks: {
    async signIn({ user, profile, account }) {
  const provider = account?.provider;
  

  if (!provider) {
    console.error("❌ signIn blocked: missing provider", { account });
    return false;
  }

  let email = user?.email ?? (profile as any)?.email;
  if (!email) {
    console.error("❌ signIn blocked: missing email", { user, profile });
    return false;
  }
  email = email.toLowerCase();

  // ✅ Skip providerAccountId check for credentials logins
  if (provider === "credentials") {
    console.info("✅ Credentials signIn allowed", { email, userId: user?.id });
    return true;
  }

  // OAuth flow
  const providerAccountId = extractProviderId(profile, provider);
  if (!providerAccountId) {
    console.error("❌ signIn blocked: missing providerAccountId", { profile, provider });
    return false;
  }

  console.info("🔑 signIn attempt", { provider, email, providerAccountId });


      // Check if OAuth account exists
      let existingAccount = await prisma.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { user: true },
      });

      if (existingAccount) {
        await logLoginAttempt({
          userId: existingAccount.user.id,
          email,
          provider,
          success: true,
          reason: "OAuth login",
        });
        return true;
      }

      // Check if user exists by email
      let dbUser = await prisma.user.findUnique({ where: { email } });

      if (!dbUser) {
        // Create new user if not exists
        const baseUsername =
          provider === "github"
            ? (profile as any)?.signin ?? email.split("@")[0]
            : email.split("@")[0];

        const name = await generateUniqueUsername(baseUsername);

        dbUser = await prisma.user.create({
          data: {
            email,
            name,
            passwordHash: "",
            coverImage: "",
          },
        });

        await logLoginAttempt({
          userId: dbUser.id,
          email,
          provider,
          success: true,
          reason: "New OAuth user registered",
        });
      }

      // Link OAuth account
      await prisma.account.create({
        data: {
          userId: dbUser.id,
          provider,
          providerAccountId,
          type: account!.type,
        },
      });

      await logLoginAttempt({
        userId: dbUser.id,
        email,
        provider,
        success: true,
        reason: "OAuth linked/created account",
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id
      if (token.id) {
        const dbUser = await prisma.user.findUnique({ where: { id: token.id as string } });
        if (dbUser) {
          token.email = dbUser.email;
          token.name = dbUser.name ?? "";
          token.coverImage = dbUser.coverImage ?? "";
          token.role = dbUser.role ?? "";
        }
      }
      return token;
    },

    async session({ session, token }) {
      
      if (token.id) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? "";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
