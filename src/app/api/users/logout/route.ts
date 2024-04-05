import connectToDB from "@/dbconfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export async function POST() {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: false });
  }
}
