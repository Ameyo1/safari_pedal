import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { getCompletionStatus } from "@/lib/getCompletionStatus";

interface RegistrationRequest {
  address: string;
  category: string;
  competitiveLevel?: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  emergencyEmail: string;
  foodAllergies?: string;
  medicationAllergies?: string;
  hasInsurance: boolean;
  insuranceDetails?: string;
  signedDate: string;
}

/**
 * POST /api/registration
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const completionStatus = await getCompletionStatus(userId);
    if (!completionStatus.hasPrivacyRecord || !completionStatus.hasMedicalRecord || !completionStatus.hasWaiverRecord) {
      await prisma.eventLog.create({
        data: {
          type: "registration_blocked",
          userId,
          metadata: {
            reason: "Missing required acknowledgments",
            email: session.user.email,
          },
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: "Registration requires completion of Privacy Policy, Medical Disclosure, and Waiver Agreement.",
        },
        { status: 403 }
      );
    }

    const body: RegistrationRequest = await req.json();

    if (
      !body.address?.trim() ||
      !body.category?.trim() ||
      !body.emergencyName?.trim() ||
      !body.emergencyRelation?.trim() ||
      !body.emergencyPhone?.trim() ||
      !body.emergencyEmail?.trim() ||
      !body.signedDate
    ) {
      return NextResponse.json({ success: false, error: "Missing or invalid registration data" }, { status: 400 });
    }

    const signedDate = new Date(body.signedDate);
 
    // 📝 Upsert safely
    const registration = await prisma.registrationForm.upsert({
      where: { userId },
      update: {
        address: body.address.trim(),
        category: body.category.trim(),
        competitiveLevel: body.category === "Competitive" ? body.competitiveLevel?.trim() || null : null,
        emergencyName: body.emergencyName.trim(),
        emergencyRelation: body.emergencyRelation.trim(),
        emergencyPhone: body.emergencyPhone.trim(),
        emergencyEmail: body.emergencyEmail.trim(),
        foodAllergies: body.foodAllergies?.trim() || "",
        medicationAllergies: body.medicationAllergies?.trim() || "",
        hasInsurance: body.hasInsurance,
        insuranceDetails: body.hasInsurance ? body.insuranceDetails?.trim() || null : null,
        signedDate,
      },
      create: {
        userId,
        address: body.address.trim(),
        category: body.category.trim(),
        competitiveLevel: body.category === "Competitive" ? body.competitiveLevel?.trim() || null : null,
        emergencyName: body.emergencyName.trim(),
        emergencyRelation: body.emergencyRelation.trim(),
        emergencyPhone: body.emergencyPhone.trim(),
        emergencyEmail: body.emergencyEmail.trim(),
        foodAllergies: body.foodAllergies?.trim() || "",
        medicationAllergies: body.medicationAllergies?.trim() || "",
        hasInsurance: body.hasInsurance,
        insuranceDetails: body.hasInsurance ? body.insuranceDetails?.trim() || null : null,
        signedDate,
      },
    });

    await prisma.eventLog.create({
      data: {
        type: "registration_completed",
        userId,
        metadata: { email: session.user.email, name: session.user.name, ...registration },
      },
    });

    return NextResponse.json({ success: true, registration, completionStatus });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/registration/status
 * Returns if user already has registration
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ registered: false }, { status: 200 });
    }

    const existing = await prisma.registrationForm.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ registered: !!existing }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ registered: false }, { status: 200 });
  }
}
