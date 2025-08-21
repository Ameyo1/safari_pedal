import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields", code: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    const lowerEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", code: "USER_EXISTS" },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: lowerEmail,
        name: name.trim(),
        passwordHash,
      },
    });

    await prisma.loginEvent.create({
      data: {
        userId: user.id,
        email: user.email,
        provider: "credentials",
        ip: req.headers.get("x-forwarded-for") || "unknown",
        success: true,
        reason: "User signup",
      },
    });

    return NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
