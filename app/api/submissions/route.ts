import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const submissions = await prisma.submission.findMany({
    include: {
      medical: true,
      policy: true,
      waiver: true,
      registration: true,
    },
  });

  return NextResponse.json(submissions);
}
