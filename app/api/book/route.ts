// /app/api/book/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logEvent } from '@/lib/data';

const BookingSchema = z.object({
  tourId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  travelers: z.number().min(1),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid start date',
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid end date',
  }),
  notes: z.string().optional(),
});

export async function GET() {
  return NextResponse.json({ message: 'API is alive' });
}


export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const result = BookingSchema.safeParse(raw);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { tourId, name, email, phone, travelers, startDate, endDate, notes } = result.data;

    // 🔐 Check if participant is registered
    const participant = await prisma.user.findFirst({
      where: { email },
    });

    if (!participant) {
      return NextResponse.json(
        { error: 'Participant not registered. Please complete registration first.' },
        { status: 403 }
      );
    }

    // 🧭 Optional: Validate tour exists
    const tour = await prisma.tourEvent.findUnique({
      where: { id: tourId },
    });

    if (!tour) {
      return NextResponse.json({ error: 'Selected tour does not exist.' }, { status: 404 });
    }

    // 📝 Create booking
    const booking = await prisma.booking.create({
      data: {
        tourId,
        userId: participant.id,
        email,
        phone,
        travelers,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        notes,
        status: 'pending',
        createdAt: new Date(),
      },
    });

    await prisma.eventLog.create({
  data: {
    type: 'booking',
    userId: participant.id,
    metadata: {
      tourId,
      travelers,
      startDate,
      endDate,
      notes,
    },
  },
});
await logEvent({
  type: "booking_created",
  userId: participant.id,
  metadata: {
    bookingId: booking.id,
  },
});


    // 📧 Send confirmation via Formspree
    const formspreeEndpoint = 'https://formspree.io/f/xdkdjnjz'; // Replace with your actual ID

    try {
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: `Hi ${name}, your booking for ${tour.title} from ${startDate} to ${endDate} has been received. We’ll be in touch soon!`,
        }),
      });
    } catch (emailErr) {
      console.warn('Formspree email failed:', emailErr);
      // Booking still succeeds even if email fails
    }

    return NextResponse.json({ success: true, booking }, { status: 200 });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

