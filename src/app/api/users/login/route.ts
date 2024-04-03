import connectToDB from "@/dbconfig/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectToDB();
    const userData = await request.json();

    const { username, email, password } = userData;
    const searchInDB = await User.findOne({ email });

    if (searchInDB) {
      console.log(searchInDB);
      return NextResponse.json({ status: 200, message: "login successful" });
    } else {
      console.error("Unable to find the email in Database : ", email);
      return NextResponse.json({
        status: 400,
        message: "something went wrong",
      });
    }
  } catch (error: any) {
    console.log("error with POST Request : ", error.message);
  }
}
