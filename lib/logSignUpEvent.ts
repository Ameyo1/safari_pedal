// // lib/logSignupEvent.ts
// import { prisma } from "@/lib/prisma";

// export async function logSignupEvent({
//   userId,
//   email,
//   ip,
//   userAgent,
//   success,
//   reason,
// }: {
//   userId?: string;
//   email?: string;
//   ip?: string;
//   userAgent?: string;
//   success: boolean;
//   reason?: string;
// }) {
//   await prisma.signupEvent.create({
//     data: {
//       userId,
//       email,
//       ip,
//       userAgent,
//       success,
//       reason,
//     },
//   });
// }
