// /api/submissions/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        medical: true,
        policy: true,
        waiver: true,
        registration: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Ensure a consistent structure
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
    console.error('Error fetching submissions:', err);
    return NextResponse.json({ submissions: [] }, { status: 500 });
  }
}
