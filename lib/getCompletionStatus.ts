import { prisma } from '@/lib/prisma';

export async function getCompletionStatus(userId: string) {
  const [privacy, medical, waiver] = await Promise.all([
    prisma.policyAgreement.findFirst({ where: { userId } }),
    prisma.medicalForm.findFirst({ where: { userId } }),
    prisma.waiverAgreement.findFirst({ where: { userId } }),
  ]);

  return {
    hasPrivacyRecord: !!privacy,
    hasMedicalRecord: !!medical,
    hasWaiverRecord: !!waiver,
  };
}
