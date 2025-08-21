import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getCompletionStatus } from "@/lib/getCompletionStatus";

export async function POST(req: Request) {
  try {
    // 🔐 Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 🧾 Parse request body
    const body = await req.json();
    const {
      phone,
      allergies,
      medicalConditions,
      injuries,
      limitations,
      otherInfo,
      signedDate,
    } = body;

    // ✅ Validate required fields
    if (!signedDate) {
      return NextResponse.json(
        { success: false, error: "Missing required field: signedDate" },
        { status: 400 }
      );
    }

    // 📅 Ensure signedDate is a valid Date
    const parsedDate = new Date(signedDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid date format for signedDate" },
        { status: 400 }
      );
    }

    // 📝 Upsert medical form (create or update in one query)
    const medicalForm = await prisma.medicalForm.upsert({
      where: { userId },
      update: {
        phone: phone ?? "",
        allergies: allergies ?? "",
        medicalConditions: medicalConditions ?? "",
        injuries: injuries ?? "",
        limitations: limitations ?? "",
        otherInfo: otherInfo ?? "",
        signedDate: parsedDate,
        signedName: session.user.name ?? "",
        email: session.user.email ?? "",
      },
      create: {
        userId,
        phone: phone ?? "",
        allergies: allergies ?? "",
        medicalConditions: medicalConditions ?? "",
        injuries: injuries ?? "",
        limitations: limitations ?? "",
        otherInfo: otherInfo ?? "",
        signedDate: parsedDate,
        signedName: session.user.name ?? "",
        email: session.user.email ?? "",
      },
    });

    // 📋 Log event
    await prisma.eventLog.create({
      data: {
        type: "medical_form_submitted",
        userId,
        metadata: {
          submittedAt: new Date().toISOString(),
          allergies: allergies ?? "",
          medicalConditions: medicalConditions ?? "",
        },
      },
    });

    // 🔄 Return updated completion status
    return NextResponse.json({
      success: true,
      medicalForm,
      completionStatus: await getCompletionStatus(userId),
    });
  } catch (err) {
    console.error("Error in POST /api/medical:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

