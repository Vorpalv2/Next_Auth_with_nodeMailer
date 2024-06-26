import connectToDB from "@/dbconfig/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  connectToDB();

  const reqBody = await request.json();
  const { token } = reqBody;
  console.log(token, " :Token");
  if (token !== null) {
    const userFromDB = await User.findOne({
      verifyToken: token,
      // verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log("user", userFromDB);

    if (userFromDB) {
      userFromDB.isVerified = true;
      userFromDB.verifyToken = undefined;
      userFromDB.verifyTokenExpiry = undefined;

      await userFromDB.save();

      return NextResponse.json({
        message: "Email verified Successfully",
        status: 200,
        textStatus: true,
      });
    } else {
      return NextResponse.json({ message: "Invalid Token", status: 400 });
    }
  } else {
    return NextResponse.json({ message: "invalid URL", status: 400 });
  }
}

export async function GET(request: NextRequest) {
  NextResponse.json({ Key: "Value" });
}

// export async function POST(request: NextRequest) {
//   const value = await request.json();
//   // console.log(value.token);
//   const { token } = value;
//   console.log(token);
//   return NextResponse.json({ data: token });
// }
