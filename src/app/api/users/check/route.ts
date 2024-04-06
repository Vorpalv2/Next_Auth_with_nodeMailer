import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password, email } = await request.json();
  //   console.log(username, password);

  return NextResponse.json({ username, password, email, success: "true" });
}
