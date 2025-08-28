import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { authorize, getSession } from '@/lib/authHook';
import { redirect } from 'next/navigation';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
 
  try {
    const [
      total,
      withMedical,
      withPolicy,
      withWaiver,
      withRegistration,
      withAll,
    ] = await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({ where: { medicalId: { not: null } } }),
      prisma.submission.count({ where: { policyId: { not: null } } }),
      prisma.submission.count({ where: { waiverId: { not: null } } }),
      prisma.submission.count({ where: { registrationId: { not: null } } }),
      prisma.submission.count({
        where: {
          AND: [
            { medicalId: { not: null } },
            { policyId: { not: null } },
            { waiverId: { not: null } },
            { registrationId: { not: null } },
          ],
        },
      }),
    ]);

    return NextResponse.json({
      total,
      withMedical,
      withPolicy,
      withWaiver,
      withRegistration,
      withAll,
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
