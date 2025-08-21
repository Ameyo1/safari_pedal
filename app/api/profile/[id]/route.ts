// app/api/profile/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/auth';

export async function GET(req: NextRequest, context: any) {
  const { params } = context; // no explicit typing here
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.id !== params.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { name: true, email: true },
    });

    const policies = await prisma.policyAgreement.findUnique({
      where: { userId: params.id },
    });
    const medical = await prisma.medicalForm.findUnique({
      where: { userId: params.id },
    });
    const waiver = await prisma.waiverAgreement.findUnique({
      where: { userId: params.id },
    });

    const events = await prisma.eventLog.findMany({
      where: { userId: params.id },
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json({
      user: {
        name: user?.name ?? '',
        email: user?.email ?? '',
        hasPolicy: Boolean(policies),
        hasMedical: Boolean(medical),
        hasWaiver: Boolean(waiver),
      },
      events,
    });
  } catch (err) {
    console.error('Profile GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context; // no explicit typing
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.id !== params.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const { name, email } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, email },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (err) {
    console.error('Profile PUT error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
