import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();

  const saved = await prisma.medicalForm.create({
    data: {
      participantName: data.participantName,
      phone: data.phone,
      email: data.email,
      medicalConditions: data.medicalConditions,
      allergies: data.allergies,
      injuries: data.injuries,
      limitations: data.limitations,
      otherInfo: data.otherInfo,
      signedName: data.signedName,
      signedDate: new Date(data.signedDate),
    },
  });

  return NextResponse.json(saved);
}
