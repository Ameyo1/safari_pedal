// /api/submissions/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from '@/auth';

export async function GET(req: Request) {
  try {
    // 🔐 1. Get session
    const session = await getServerSession(authOptions);

    // 🔐 2. Reject if not admin
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ✅ 3. Fetch submissions only for admins
    const submissions = await prisma.submission.findMany({
      include: {
        medical: true,
        policy: true,
        waiver: true,
        registration: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = submissions.map((s) => ({
      id: s.id,
      tourId: s.tourId,
      participantName: s.participantName,
      email: s.email,
      phone: s.phone,
      createdAt: s.createdAt.toISOString(),
      medical: s.medical ?? null,
      policy: s.policy ?? null,
      waiver: s.waiver ?? null,
      registration: s.registration ?? null,
    }));

    return NextResponse.json({ submissions: formatted });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
