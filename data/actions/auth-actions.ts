"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { logAuthEvents } from "@/lib/logAuthEvents";
import { headers } from "next/headers";
import { signIn } from "next-auth/react";

const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const loginSchema = z.object({
  identifier: z.string().min(3).max(100), // email or username
  password: z.string().min(6).max(100),
});

async function getClientMeta() {
  const h = headers();
  return {
    ip: (await h).get("x-forwarded-for") ?? "",
    userAgent: (await h).get("user-agent") ?? "",
  };
}

export async function registerUserAction(_: unknown, formData: FormData) {

  try {
    const parsed = signupSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const existing = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existing) {
      await logAuthEvents({
        type: "SIGNUP",
        email: parsed.email,
        success: false,
        reason: "Email already in use",
      });
      return { message: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    const user = await prisma.user.create({
      data: {
        name: parsed.username,
        email: parsed.email,
        passwordHash: hashedPassword,
      },
    });

    await logAuthEvents({
      type: "SIGNUP",
      userId: user.id,
      email: user.email,
      success: true,
    });

    return { message: "Signup successful" };
  } catch (err: any) {
    await logAuthEvents({
      type: "SIGNUP",
      email: formData.get("email")?.toString(),
      success: false,
      reason: err?.message || "Signup failed",
    });

    return { message: "Signup failed" };
  }
}
// data/actions/auth-actions.ts

export async function loginUserAction(_: unknown, formData: FormData) {

  try {
    const parsed = loginSchema.parse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    });

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: parsed.identifier }, { name: parsed.identifier }],
      },
    });

    if (!user) {
      await logAuthEvents({
        type: "LOGIN",
        email: parsed.identifier,
        success: false,
        reason: "User not found",
      });
      return { message: "Invalid credentials" };
    }

    const passwordMatch = await bcrypt.compare(parsed.password, user.passwordHash);

    if (!passwordMatch) {
      await logAuthEvents({
        type: "LOGIN",
        email: user.email,
        userId: user.id,
        success: false,
        reason: "Invalid password",
      });
      return { message: "Invalid credentials" };
    }

    await logAuthEvents({
      type: "LOGIN",
      userId: user.id,
      email: user.email,
      success: true,
    });

    await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: parsed.password,
    });

    return { message: "Login successful" };
  } catch (err: any) {
    await logAuthEvents({
      type: "LOGIN",
      email: formData.get("identifier")?.toString(),
      success: false,
      reason: err?.message || "Login failed",
    });
    return { message: "Login failed" };
  }
}
