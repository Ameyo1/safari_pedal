import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { logEvent } from "@/lib/data";
import { requirePolicies } from "@/lib/requirePolicies";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const BookingSchema = z.object({
  tourId: z.string().min(1, "Tour ID is required"),
  phone: z.string().optional(),
  travelers: z.coerce.number().int().positive("At least one traveler is required"),
  startDate: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }),
  notes: z.string().optional(),
}).refine(
  (data) => Date.parse(data.endDate) >= Date.parse(data.startDate),
  { message: "End date must be after start date", path: ["endDate"] }
);

export async function GET() {
  return NextResponse.json({ success: true, message: "Booking API is alive" });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const participant = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!participant) {
      return NextResponse.json({ success: false, error: "User not registered" }, { status: 403 });
    }

    const raw = await req.json();
    const parsed = BookingSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tourId, phone, travelers, startDate, endDate, notes } = parsed.data;

    const redirectPolicy = await requirePolicies(participant.id);
    if (redirectPolicy) {
      return NextResponse.json(
        { success: false, code: "POLICIES_INCOMPLETE", redirectUrl: redirectPolicy.url },
        { status: 403 }
      );
    }

    const tour = await prisma.tourEvent.findUnique({ where: { id: tourId } });
    if (!tour) {
      return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 });
    }

    // Stronger duplicate check (any booking overlapping same tour & user)
    const overlapping = await prisma.booking.findFirst({
      where: {
        userId: participant.id,
        tourId,
        OR: [
          { startDate: { lte: new Date(endDate) }, endDate: { gte: new Date(startDate) } },
        ],
      },
    });
    if (overlapping) {
      return NextResponse.json(
        { success: false, error: "Booking already exists", bookingId: overlapping.id },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        tourId,
        userId: participant.id,
        email: participant.email,
        phone,
        travelers,
        startDate: new Date(startDate), // normalize UTC
        endDate: new Date(endDate),
        notes,
        status: "pending",
      },
    });

    await prisma.eventLog.create({
      data: {
        type: "booking",
        userId: participant.id,
        metadata: { tour: tour.title, travelers, startDate, endDate, notes },
      },
    });

    await logEvent({ type: "booking_created", userId: participant.id, metadata: { bookingId: booking.id } });

    return NextResponse.json({ success: true, booking }, { status: 200 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
