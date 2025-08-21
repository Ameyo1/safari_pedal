// lib/requirePolicies.ts
import { getCompletionStatus } from './getCompletionStatus';
import { NextResponse } from 'next/server';

export async function requirePolicies(userId: string) {
  const status = await getCompletionStatus(userId);

  if (!status.hasMedicalRecord) {
    return NextResponse.redirect('/policies');
  }

  // Add additional policy checks here if needed
  // e.g., otherPoliciesCompleted

  return null; // null means all required policies are completed
}
