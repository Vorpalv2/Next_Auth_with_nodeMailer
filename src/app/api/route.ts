import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "hello" });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const requestedData = await req.formData();

  return NextResponse.json({ data: requestedData.get("design") });

  // return req.formData().then((resp) => {
  //   return NextResponse.json({ formData: resp.get("question") });
  // });
}
