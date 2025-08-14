// /api/analytics/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const total = await prisma.submission.count();
  const withMedical = await prisma.submission.count({ where: { medicalId: { not: null } } });
  const withPolicy = await prisma.submission.count({ where: { policyId: { not: null } } });
  const withWaiver = await prisma.submission.count({ where: { waiverId: { not: null } } });
  const withRegistration = await prisma.submission.count({ where: { registrationId: { not: null } } });

  return NextResponse.json({
    total,
    withMedical,
    withPolicy,
    withWaiver,
    withRegistration,
  });
}
