// /app/api/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      participantName,
      email,
      phone,
      address,
      category,
      competitiveLevel,
      emergencyName,
      emergencyRelation,
      emergencyPhone,
      emergencyEmail,
      foodAllergies,
      medicationAllergies,
      hasInsurance,
      insuranceDetails,
      signedDate,
    } = data;

    // 🔍 Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // 🛡️ Generate placeholder password hash for civic-only access
      const defaultPassword = await hash('pedal-safari-temp', 10);

      user = await prisma.user.create({
        data: {
          name: participantName,
          email,
          phone,
          passwordHash: defaultPassword,
        },
      });
    }

    // 📝 Store extended registration data in RegistrationForm model
    await prisma.registrationForm.create({
      data: {
        userId: user.id,
        address,
        category,
        competitiveLevel: category === 'Competitive' ? competitiveLevel : null,
        emergencyName,
        emergencyRelation,
        emergencyPhone,
        emergencyEmail,
        foodAllergies,
        medicationAllergies,
        hasInsurance,
        insuranceDetails: hasInsurance ? insuranceDetails : null,
        signedDate: new Date(signedDate),
      },
    });

    await prisma.eventLog.create({
  data: {
    type: 'registration',
    userId: user.id,
    metadata: {
      name: participantName,
      email,
      category,
      hasInsurance,
      emergencyContact: emergencyName,
    },
  },
});


    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
