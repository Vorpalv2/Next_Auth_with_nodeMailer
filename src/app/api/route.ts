import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "hello" });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const requestedData = await req.formData();
  const file = requestedData.get("name");
  console.log(file!.size);
  return NextResponse.json({ data: requestedData.get("first") });

  // return NextResponse.json({data: name})

  // return req.formData().then((resp) => {
  //   return NextResponse.json({ formData: resp.get("question") });
  // });
}
