
import { boolean } from "zod";
import { prisma } from "./prisma";

export async function logFailedLogin({
  email,
  ip,
  reason,
}: {
  email?: string;
  ip?: string;
  reason: string;
}) {
  await prisma.loginEvent.create({
    data: { email, ip, reason, success: false, provider: "credentials" },
  });
}

interface LogLoginAttemptArgs {
  email?: string | null;
  userId?: string | null;
  provider: string;
  ip?: string | null;
  reason?: string | null;
  success: boolean; // null for unknown (pre-OAuth)
}


interface LogLoginAttemptArgs {
  email?: string | null;
  userId?: string | null;
  provider: string;
  ip?: string | null;
  reason?: string | null;
  success: boolean;
}

export async function logLoginAttempt({
  email,
  userId,
  provider,
  ip,
  reason,
  success,
}: LogLoginAttemptArgs) {
  try {
    // Determine country from IP
    // const geo = ip ? geoip.lookup(ip) : null;
    // const country = geo ? geo.country : null;

    // // Parse user agent
    // const userAgent = ip ? new UAParser().setUA(ip).getResult() : null;

    await prisma.loginEvent.create({
      data: {
        email,
        userId,
        provider,
        ip,
        reason,
        success,
      },
    });
  } catch (err) {
    console.error("Failed to log login attempt", err);
  }
}