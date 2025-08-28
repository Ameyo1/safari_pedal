import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Zod schemas per section
const settingsSchema = {
  profile: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
  }),
  account: z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
  }),
  security: z.object({
    twoFactor: z.boolean().optional(),
  }),
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
  }),
};

// ✅ GET handler
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const settings = await prisma.settings.findUnique({
    where: { userId: session.user.id },
  });

  if (!settings) {
    return NextResponse.json({
      profile: { name: "", bio: "" },
      account: { email: session.user.email, username: "" },
      security: { twoFactor: false },
      notifications: { email: true, push: true },
    });
  }

  return NextResponse.json({
    profile: { name: settings.profileName ?? "", bio: settings.profileBio ?? "" },
    account: { email: settings.accountEmail ?? session.user.email, username: settings.accountUsername ?? "" },
    security: { twoFactor: settings.twoFactor ?? false },
    notifications: { email: settings.notifEmail ?? true, push: settings.notifPush ?? true },
  });
}


// ✅ POST handler
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { section, data } = await req.json();

  if (!(section in settingsSchema)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const parsed = settingsSchema[section as keyof typeof settingsSchema].safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Map incoming section data → Prisma columns
  let updateData: Record<string, any> = {};
  if (section === "profile") {
    updateData = { profileName: data.name, profileBio: data.bio };
  } else if (section === "account") {
    updateData = { accountEmail: data.email, accountUsername: data.username };
  } else if (section === "security") {
    updateData = { twoFactor: data.twoFactor };
  } else if (section === "notifications") {
    updateData = { notifEmail: data.email, notifPush: data.push };
  }

  const settings = await prisma.settings.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, ...updateData },
    update: updateData,
  });

  // Save log entry
  await prisma.settingsLog.create({
    data: {
      userId: session.user.id,
      section,
      changes: data,
    },
  });

  // ✅ Map back to front-end shape
  const mapped = {
    profile: { name: settings.profileName ?? "", bio: settings.profileBio ?? "" },
    account: { email: settings.accountEmail ?? session.user.email, username: settings.accountUsername ?? "" },
    security: { twoFactor: settings.twoFactor ?? false },
    notifications: { email: settings.notifEmail ?? true, push: settings.notifPush ?? true },
  };

  return NextResponse.json({
    message: "Settings updated",
    settings: mapped,
  });
}
