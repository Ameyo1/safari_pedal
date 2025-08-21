// lib/logAuthEvent.ts
import { prisma } from "@/lib/prisma";

export async function logAuthEvents({
  type,
  userId,
  email,
  ip,
  userAgent,
  success,
  reason,
}: {
  type: "LOGIN" | "SIGNUP";
  userId?: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  success: boolean;
  reason?: string;
}) {
  await prisma.authEvents.create({
    data: {
      type,
      userId,
      email,
      ip,
      userAgent,
      success,
      reason,
    },
  });
}
