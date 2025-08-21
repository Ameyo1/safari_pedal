import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

/**
 * GET /api/policies
 * Fetch the current user's policy agreement
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const agreement = await prisma.policyAgreement.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ success: true, agreement: agreement ?? null });
  } catch (err) {
    console.error("Error fetching policy agreement:", err);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

/**
 * POST /api/policies
 * Create or update the current user's policy agreement
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { agreed } = await req.json();
    if (typeof agreed !== "boolean") {
      return NextResponse.json(
        { success: false, error: "'agreed' field must be a boolean" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const date = new Date();

    // ✅ Use upsert for single-query create/update
    const agreement = await prisma.policyAgreement.upsert({
      where: { userId },
      update: { agreed, signedDate: date },
      create: { userId, agreed, signedDate: date },
    });

    return NextResponse.json({ success: true, agreement });
  } catch (err) {
    console.error("Error saving policy agreement:", err);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

/**
 * DELETE /api/policies
 * Delete the current user's policy agreement
 */
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.policyAgreement.findUnique({
      where: { userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "No agreement found" }, { status: 404 });
    }

    await prisma.policyAgreement.delete({ where: { id: existing.id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting policy agreement:", err);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

