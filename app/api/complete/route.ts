import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;

    const [privacy, medical, waiver, registration] = await Promise.all([
      prisma.policyAgreement.findFirst({ where: { userId } }),
      prisma.medicalForm.findFirst({ where: { userId } }),
      prisma.waiverAgreement.findFirst({ where: { userId } }),
      prisma.registrationForm.findFirst({ where: { userId } }),
    ]);

    const isComplete = !!privacy && !!medical && !!waiver && !!registration;

    // 🚦 Redirect logic
    if (isComplete) {
      return NextResponse.redirect(new URL("/booking", process.env.NEXT_PUBLIC_APP_URL));
    }

    return NextResponse.redirect(new URL("/participate/start-registration", process.env.NEXT_PUBLIC_APP_URL));
  } catch (err) {
    console.error("Error in /api/complete:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
