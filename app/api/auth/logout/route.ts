import { NextResponse } from "next/server";

export async function POST() {
  // مع JWT عادة الـ logout في الفرونت بإزالة التوكن
  return NextResponse.json({ message: "Logged out" });
}
