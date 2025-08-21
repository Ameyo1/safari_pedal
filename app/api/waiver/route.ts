import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { getCompletionStatus } from "@/lib/getCompletionStatus";

interface WaiverRequest {
  phone: string;
  email: string;
  signedDate: string;
  agreed: boolean;
}

function response(success: boolean, data?: any, error?: string, status = 200) {
  return NextResponse.json({ success, data, error }, { status });
}

// Basic validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+\-\s]{7,20}$/;

/**
 * POST /api/waiver
 * Create or update the current user's waiver agreement
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return response(false, null, "Unauthorized", 401);
    }

    const userId = session.user.id;
    const { phone, email, signedDate, agreed }: WaiverRequest = await req.json();

    // Validate inputs
    if (!agreed) {
      return response(false, null, "You must agree to the waiver terms", 400);
    }
    if (!phone?.trim() || !phoneRegex.test(phone)) {
      return response(false, null, "Invalid phone number", 400);
    }
    if (!email?.trim() || !emailRegex.test(email)) {
      return response(false, null, "Invalid email address", 400);
    }
    if (!signedDate) {
      return response(false, null, "Signed date is required", 400);
    }

    const parsedDate = new Date(signedDate);
    const today = new Date().toISOString().split("T")[0];
    if (isNaN(parsedDate.getTime()) || signedDate !== today) {
      return response(false, null, "Signed date must be today's date", 400);
    }

    const waiver = await prisma.waiverAgreement.upsert({
      where: { userId },
      update: { phone, email, signedDate: parsedDate, agreed },
      create: { userId, phone, email, signedDate: parsedDate, agreed },
    });

    await prisma.eventLog.create({
      data: {
        type: "waiver_signed",
        userId,
        metadata: { signedAt: new Date().toISOString(), phone, email },
      },
    });

    const completionStatus = await getCompletionStatus(userId);

    return response(true, { waiver, completionStatus });
  } catch (err) {
    console.error("Error in POST /api/waiver:", err);
    return response(false, null, "Internal server error", 500);
  }
}

/**
 * GET /api/waiver
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return response(false, null, "Unauthorized", 401);
    }

    const waiver = await prisma.waiverAgreement.findUnique({
      where: { userId: session.user.id },
    });

    const completionStatus = await getCompletionStatus(session.user.id);

    return response(true, { waiver, completionStatus });
  } catch (err) {
    console.error("Error fetching waiver agreement:", err);
    return response(false, null, "Internal server error", 500);
  }
}

/**
 * DELETE /api/waiver
 */
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return response(false, null, "Unauthorized", 401);
    }

    const existing = await prisma.waiverAgreement.findUnique({
      where: { userId: session.user.id },
    });

    if (!existing) {
      return response(false, null, "No waiver found", 404);
    }

    await prisma.waiverAgreement.delete({ where: { id: existing.id } });

    await prisma.eventLog.create({
      data: {
        type: "waiver_deleted",
        userId: session.user.id,
        metadata: { deletedAt: new Date().toISOString() },
      },
    });

    return response(true, { message: "Waiver deleted" });
  } catch (err) {
    console.error("Error deleting waiver agreement:", err);
    return response(false, null, "Internal server error", 500);
  }
}
