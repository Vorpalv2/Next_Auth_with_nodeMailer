import connectToDB from "@/dbconfig/dbConnect";
import { User } from "@/models/userModel";
import getDataFromCookie from "@/utils/getDataFromCookies";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
  try {
    //get data from cookies
    const userID = getDataFromCookie(request);
    // console.log(userID);

    const userData = await User.findById(userID).select("-password");
    // console.log(userData);

    return NextResponse.json(
      { message: "User Found", data: userData, status: "success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: "failure with getting user data " + error.message,
      status: "Failure",
    });
  }
}
