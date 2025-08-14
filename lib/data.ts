import { prisma } from "@/lib/prisma";
import { BlogPost, Prisma } from "@prisma/client";


function parseDate(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? undefined : date;
}

// export async function fetchTours({
//   searchParams,
//   page = 1,
//   pageSize = 12,
// }: {
//   searchParams: Record<string, string>;
//   page?: number;
//   pageSize?: number;
// }) {
//   const { query, parkId, startDate, endDate } = searchParams;

//   const filters: Prisma.TourEventWhereInput = {
    
//     ...(query && {
//       title: { contains: query, mode: "insensitive" },
//     }),
//     ...(parkId && {
//       parkId,
//     }),
//     ...(startDate && {
//       startDate: { gte: parseDate(startDate) },
//     }),
//     ...(endDate && {
//       endDate: { lte: parseDate(endDate) },
//     }),
//   };

//   const [tours, totalCount] = await Promise.all([
//     prisma.tourEvent.findMany({
//       where: filters,
//       include: { park: true },
//       orderBy: { startDate: "asc" },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     }),
//     prisma.tourEvent.count({ where: filters }),
//   ]);

//   return { tours, totalCount };
// }


export async function fetchBlogPosts(): Promise<Pick<BlogPost, "id" | "title" | "slug" | "content" | "publishedAt">[]> {
  return prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      publishedAt: true,
    },
  });
}

export async function fetchTours({ page = 1, pageSize = 20 }) {
  const tours = await prisma.tourEvent.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      park: true,
      destinations: true,
      hotels: true
    },
    orderBy: { startDate: 'desc' },
  });

  return { tours };
}

// export async function fetchTourById(id: string) {
//   return await prisma.tourEvent.findUnique({
//     where: { id },
//     include: {
//       park: true,
//       destinations: true,
//       hotels: true
//     },
//   });
// }


// lib/fetchTourById.ts


export async function fetchTourById(id: string | undefined) {
  if (!id || typeof id !== 'string') return null;

  return await prisma.tourEvent.findUnique({
    where: { id },
    include: {
      park: true,
      destinations: true,
      hotels: true
    }
  });
}


export async function logEvent({
  type,
  userId,
  metadata,
}: {
  type: string;
  userId?: string;
  metadata?: Record<string, any>;
}) {
  await prisma.eventLog.createMany({
    data: {
      type,
      userId,
      metadata,
      timestamp: new Date(),
    },
  });
}

