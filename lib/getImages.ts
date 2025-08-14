// lib/getImages.ts
import { prisma } from './prisma';

export async function getParkImages() {
  return await prisma.park.findMany({
    select: {
      id: true,
      imageGallery: true,
      name: true,
    },
  });
}
