import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();

  const saved = await prisma.waiverAgreement.create({
    data: {
      participantName: data.participantName,
      phone: data.phone,
      email: data.email,
      signedDate: new Date(data.signedDate),
      agreed: data.agreed,
    },
  });

  return NextResponse.json(saved);
}
