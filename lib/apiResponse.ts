import { NextResponse } from "next/server";

export function apiResponse(success: boolean, data?: any, error?: any, status = 200) {
  return NextResponse.json({ success, data, error }, { status });
}
