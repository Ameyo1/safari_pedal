// /app/api/tours/route.ts (Next.js 13+ App Router)
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { title } from 'process';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const region = searchParams.get('region');
  const category = searchParams.get('category');

  const tours = await prisma.tourEvent.findMany({
        orderBy: { startDate: 'asc' },
  });

  return NextResponse.json(tours);
}
