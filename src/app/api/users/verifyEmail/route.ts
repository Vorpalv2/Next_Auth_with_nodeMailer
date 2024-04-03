import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("hello");
  const bodyData = await request.json();
  console.log(bodyData);
  NextResponse.json(bodyData);
}

export async function GET(request: NextRequest) {
  NextResponse.json({ Key: "Value" });
}
